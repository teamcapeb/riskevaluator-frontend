import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EvaluationService } from '@services/serviceEvaluation/evaluation.service';
import { NavigationExtras, Route, Router } from "@angular/router";
import { IEntreprise } from '@/interfaces/IEntreprise';
import IQuestionnaire from '@/interfaces/IQuestionnaire';

@Component({
  selector: 'app-evaluation-entreprise-info',
  templateUrl: './evaluation-entreprise-info.component.html',
  styleUrls: ['./evaluation-entreprise-info.component.scss']
})
export class EvaluationEntrepriseInfoComponent implements OnInit {
  introDisplay = environment.evaluerIHM.introDisplay;
  frmEntreprise : FormGroup;
  evaluerIHM = environment.evaluerIHM.formulaireContact;




  constructor(private fb: FormBuilder, private evaluationService: EvaluationService, private route: Router) {

    this.frmEntreprise = this.initForm();

  }
  ngOnInit(): void {
  }

  initForm(): FormGroup {
    return  this.fb.group(
      {
        // email is required and must be a valid email email
        noSiret: [null, Validators.compose([
          Validators.required])
        ],
        effectif: [null],
        annee: [null],
        nomEnterprise: [null, Validators.compose([
          Validators.required])
        ]
      });
  }


  nextStep() {
    if(this.frmEntreprise.valid ) {
      this.route.navigate(['evaluer/questionnaire-evaluation'], { state : {
          entreprise : this.frmEntreprise.value as IEntreprise
        } });
    }else {
      this.frmEntreprise.markAllAsTouched();
    }
  }
}
