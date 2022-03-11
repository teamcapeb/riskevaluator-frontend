import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import { ContactComponent } from "@pages/visitor/contact/contact.component";
import { EvaluerComponent } from '@pages/visitor/evaluer/evaluer.component';
import { HistoriqueComponent } from '@pages/visitor/historique/historique.component';
import { GestionMetiersComponent } from '@pages/administration/gestion-metiers/gestion-metiers.component';
import { GestionQuestionnaireComponent } from '@pages/administration/gestion-questionnaire/gestion-questionnaire.component';
import { GestionComptesComponent } from '@pages/administration/gestion-comptes/gestion-comptes.component';
import { GestionQuestionComponent } from './pages/administration/gestion-question/gestion-question.component';
import { GestionCategorieQuestionsComponent } from '@pages/administration/gestion-categorie-questions/gestion-categorie-questions.component';
import { QuestionFormComponent } from './pages/administration/gestion-question/question-form/question-form.component';
import { EvaluationWelcomeComponent } from "@pages/visitor/evaluer/evaluation-welcome/evaluation-welcome.component";
import { EvaluationQuestionnaireComponent } from '@pages/visitor/evaluer/evaluation-questionnaire/evaluation-questionnaire.component';
import { EvaluationThematiqueComponent } from '@pages/visitor/evaluer/evaluation-thematique/evaluation-thematique.component';
import {
  ResultatItemComponent
} from "@pages/visitor/evaluer/evaluation-resultat/resultat-item/resultat-item.component";
import { EvaluationResultatComponent } from "@pages/visitor/evaluer/evaluation-resultat/evaluation-resultat.component";

import { EvaluationEntrepriseInfoComponent } from '@pages/visitor/evaluer/evaluation-entreprise-info/evaluation-entreprise-info.component';
import { ConfirmDeactivateGuard } from "@services/guards/ConfirmDeactivateGuard";
import {
  ResultRadarchartItemComponent
} from "@pages/visitor/evaluer/evaluation-resultat/result-radarchart-item/result-radarchart-item.component";
import { ResultatListComponent } from '@pages/visitor/evaluer/evaluation-resultat/resultat-list/resultat-list.component';
import { HomePageComponent } from "@pages/visitor/home-page/home-page.component";
import { ConsulterEvaluationComponent } from '@pages/administration/consulter-evaluation/consulter-evaluation.component';



const administration: Routes = [
  {
    path: 'gestion-metiers',
    component: GestionMetiersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-questionnaires/:idQuestionnaire/gestion-categories-questions',
    component: GestionCategorieQuestionsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'gestion-questionnaires',
    component: GestionQuestionnaireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-questionnaires/:idQuestionnaire/gestion-categories-questions/:idCategorie/gestion-questions',
    component: GestionQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-questionnaires/:idQuestionnaire/gestion-categories-questions/:idCategorie/gestion-questions/:idQuestion/question',
    component: QuestionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gestion-compte',
    component: GestionComptesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consulter-evaluation',
    component: ConsulterEvaluationComponent,
    canActivate: [AuthGuard]
  }

]
const visitors: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'historiques/:id',
    component: EvaluationResultatComponent
  },
  {
    path: 'historiques',
    component: EvaluationResultatComponent
  },
  {
    path: 'evaluer',
    children : [
      {
        path: '',
        pathMatch:'full',
        component: EvaluerComponent
      },
      {
        path: 'evaluation-thematique/:metiers',
        component: EvaluationThematiqueComponent
      }
    ]
  },
  {
    path: 'evaluer/questionnaire-evaluation',
    component: EvaluationQuestionnaireComponent
  },
  {
    path: 'evaluer/welcome-evaluation',
    component: EvaluationWelcomeComponent
  },
  {
    path: 'evaluer/evaluation-resultat',
    component: EvaluationResultatComponent
  },
  {
    path: 'evaluer/evaluation-entreprise-info',
    component: EvaluationEntrepriseInfoComponent
  },
  {
    path: 'Acceuil',
    component: HomePageComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: '',
    component: HomePageComponent
  }
]

// canActivate: [AuthGuard], canActivateChild: [AuthGuard]
const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [ ...administration, ...visitors]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy',scrollPositionRestoration:'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
