import { Component, HostListener, OnInit } from "@angular/core";
import {ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import { IEntreprise } from "@/interfaces/IEntreprise";
import IMetier from "@/interfaces/IMetier";
import { Observable } from "rxjs";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";

@Component({
  selector: 'app-evaluation-welcome',
  templateUrl: './evaluation-welcome.component.html',
  styleUrls: ['./evaluation-welcome.component.scss']
})
export class EvaluationWelcomeComponent implements OnInit {

  introDisplay = environment.evaluerIHM.introDisplay;
  frmEntreprise : FormGroup;
  evaluerIHM = environment.evaluerIHM.formulaireContact;


  private data : {idQuestionnaire : number, metierList : number[]} = {idQuestionnaire : 0, metierList: []};


  constructor(private fb: FormBuilder,
              private evaluationService: EvaluationService,
              private evalTokenStorageService : EvalTokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {
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
          Validators.required, Validators.min(1000)])
        ],
        effectif: [1, Validators.compose([
          Validators.required,Validators.min(1), Validators.max(100000)])
        ],
        annee: [2010, Validators.compose([
          Validators.required,Validators.min(1900), Validators.minLength(5)])
        ],
        nomEnterprise: [null, Validators.compose([
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

}

