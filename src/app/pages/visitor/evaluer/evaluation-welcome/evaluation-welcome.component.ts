import { Component, HostListener, OnInit } from "@angular/core";
import {ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import { IEntreprise } from "@/interfaces/IEntreprise";
import {IMetier} from "@/interfaces/IMetier";
import { Observable } from "rxjs";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";
import { EntrepriseService } from "@services/serviceEntreprise/entreprise.service";

@Component({
  selector: 'app-evaluation-welcome',
  templateUrl: './evaluation-welcome.component.html',
  styleUrls: ['./evaluation-welcome.component.scss']
})
export class EvaluationWelcomeComponent implements OnInit {

  introDisplay = environment.evaluerIHM.introDisplay;
  frmEntreprise : FormGroup;
  evaluerIHM = environment.evaluerIHM.formulaireContact;
  entreprise : IEntreprise;


  private data : {idQuestionnaire : number, metierList : number[]} = {idQuestionnaire : 0, metierList: []};


  constructor(private fb: FormBuilder,
              private evaluationService: EvaluationService,
              private evalTokenStorageService : EvalTokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private entrepriseService: EntrepriseService) {
    this.data.idQuestionnaire = +this.route.snapshot.paramMap.get('idQuestionnaire');
    this.data.metierList = this.route.snapshot.paramMap.get('metierIds').split(",").map(Number);

    this.frmEntreprise = this.initForm();

  }
  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return  this.fb.group(
      {
        // email is required and must be a valid email email
        noSiret: ["", Validators.compose([
          Validators.required, Validators.pattern("[0-9]{14}")])
        ],
        effectif: [1, Validators.compose([
          Validators.required,Validators.min(1), Validators.max(100000)])
        ],
        anneeDeCreation: [2010, Validators.compose([
          Validators.required,Validators.min(1900), Validators.minLength(5)])
        ],
        nomEntreprise: [null, Validators.compose([
          Validators.required])
        ]
      });
  }


  nextStep() {
    if(this.frmEntreprise.valid ) {

      this.evalTokenStorageService.saveEntreprise(this.frmEntreprise.value as IEntreprise);

      this.router.navigate(['evaluer/questionnaire-evaluation',{
        idQuestionnaire : this.data.idQuestionnaire ,
        metierIds : this.data.metierList
      }]);
    }else {
      this.frmEntreprise.markAllAsTouched();
    }
  }

  getEntrepriseBySiret(){
    let oldsiret = this.frmEntreprise.controls['noSiret'].value;
    if (this.frmEntreprise.controls['noSiret'].valid){
      this.entrepriseService.get(this.frmEntreprise.controls['noSiret'].value).subscribe(res => {
        this.entreprise = res;
        this.frmEntreprise.controls['effectif'].setValue(this.entreprise.effectif);
        this.frmEntreprise.controls['anneeDeCreation'].setValue(this.entreprise.anneeDeCreation);
        this.frmEntreprise.controls['nomEntreprise'].setValue(this.entreprise.nomEntreprise);
      });
    }else {
      this.frmEntreprise = this.initForm();
      this.frmEntreprise.controls['noSiret'].setValue(oldsiret);
    }
  }

}

