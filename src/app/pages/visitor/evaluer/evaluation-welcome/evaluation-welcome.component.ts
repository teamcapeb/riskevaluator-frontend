import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-evaluation-welcome',
  templateUrl: './evaluation-welcome.component.html',
  styleUrls: ['./evaluation-welcome.component.scss']
})
export class EvaluationWelcomeComponent implements OnInit {
  introDisplay = environment.evaluerIHM.introDisplay;
  frmContact : FormGroup;
  evaluerIHM = environment.evaluerIHM.formulaireContact;

  constructor(private fb: FormBuilder) {
    this.frmContact = this.initForm();
  }

  initForm(): FormGroup {
    return  this.fb.group(
      {
        // email is required and must be a valid email email
        noSiret: [null, Validators.compose([
          Validators.required])
        ],
        effectif: [null, Validators.compose([
          Validators.required])
        ],
        annee: [null, Validators.compose([
          Validators.required])
        ],
        nomEnterprise: [null, Validators.compose([
          Validators.required])
        ]
      });
  }

  ngOnInit(): void {

  }

}

