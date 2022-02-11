import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-evaluation-welcome',
  templateUrl: './evaluation-welcome.component.html',
  styleUrls: ['./evaluation-welcome.component.scss']
})
export class EvaluationWelcomeComponent implements OnInit {
  introDisplay = environment.evaluerIHM.introDisplay;
  state : any;



  constructor(private router: Router,
              private route: ActivatedRoute,) {
    type idQuestionnaireListMetier = {
      metierList: string[],
      idQuestionnaire: string
    }
    const navigation = this.router.getCurrentNavigation();
    this.state = navigation.extras.state as idQuestionnaireListMetier;
    console.log(this.state);

  }

  ngOnInit(): void {

  }

}

