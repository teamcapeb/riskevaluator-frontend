import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import { GestionComptesComponent } from './pages/administration/gestion-comptes/gestion-comptes.component';
import { GestionMetiersComponent } from './pages/administration/gestion-metiers/gestion-metiers.component';
import { GestionQuestionnaireComponent } from './pages/administration/gestion-questionnaire/gestion-questionnaire.component';
import { EvaluerComponent } from './pages/visitor/evaluer/evaluer.component';
import { HistoriqueComponent } from './pages/visitor/historique/historique.component';
import { ContactComponent } from './pages/visitor/contact/contact.component';
import { authInterceptorProviders } from "@services/_helpers/auth.interceptor";
import { GestionQuestionComponent } from './pages/administration/gestion-question/gestion-question.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { MetierFormComponent } from './pages/administration/gestion-metiers/metier-form/metier-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

import { GestionCategorieQuestionsComponent } from './pages/administration/gestion-categorie-questions/gestion-categorie-questions.component';
import { PreconisationGlobalFormComponent } from './pages/administration/gestion-categorie-questions/preconisation-global-form/preconisation-global-form.component';

import { QuestionFormComponent } from './pages/administration/gestion-question/question-form/question-form.component';
import { QuestionModalComponent } from './pages/administration/gestion-question/question-modal/question-modal.component';
import { ListItemColComponent } from './components/list/list-item/list-item-col/list-item-col.component';
import { ReponseFormComponent } from './pages/administration/gestion-question/question-form/reponse-form/reponse-form.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatToolbarModule } from "@angular/material/toolbar";

import { CategorieQuestionFormComponent } from './pages/administration/gestion-categorie-questions/categorie-question-form/categorie-question-form.component';

import { PreconisationCategorieQuestionFormComponent } from './pages/administration/gestion-question/preconisation-categorie-question-form/preconisation-categorie-question-form.component';
import { QuestionnaireFormComponent } from '@pages/administration/gestion-questionnaire/questionnaire-form/questionnaire-form.component';

import { EvaluationQuestionComponent } from "@pages/visitor/evaluer/evaluation-question/evaluation-question.component";
import { EvaluationQuestionnaireComponent } from "@pages/visitor/evaluer/evaluation-questionnaire/evaluation-questionnaire.component";
import { EvaluationWelcomeComponent } from "@pages/visitor/evaluer/evaluation-welcome/evaluation-welcome.component";
import { EvaluationLoadingComponent } from './pages/visitor/evaluer/evaluation-loading/evaluation-loading.component';
import { EvaluationFooterComponent } from './pages/visitor/evaluer/evaluation-footer/evaluation-footer.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EvaluationHeadComponent } from "@pages/visitor/evaluer/evaluation-head/evaluation-head.component";
import { EvaluationBodyComponent } from "@pages/visitor/evaluer/evaluation-body/evaluation-body.component";
import { EvaluationThematiqueComponent } from './pages/visitor/evaluer/evaluation-thematique/evaluation-thematique.component';
import { EvaluationResultatComponent } from './pages/visitor/evaluer/evaluation-resultat/evaluation-resultat.component';
import { ResultatItemComponent } from './pages/visitor/evaluer/evaluation-resultat/resultat-item/resultat-item.component';
import { NgCircleProgressModule } from "ng-circle-progress";
import { EvaluationEntrepriseInfoComponent } from './pages/visitor/evaluer/evaluation-entreprise-info/evaluation-entreprise-info.component';
import { OopsMessageComponent } from './components/oops-message/oops-message.component';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        PrivacyPolicyComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        GestionComptesComponent,
        GestionMetiersComponent,
        GestionQuestionnaireComponent,
        EvaluerComponent,
        HistoriqueComponent,
        ContactComponent,
        GestionQuestionComponent,
        ListComponent,
        ListItemComponent,
        MetierFormComponent,
        ErrorModalComponent,

        GestionCategorieQuestionsComponent,
        PreconisationGlobalFormComponent,
        EvaluationQuestionComponent,
        EvaluationHeadComponent,
        EvaluationQuestionnaireComponent,
        EvaluationWelcomeComponent,
        EvaluationBodyComponent,
        QuestionFormComponent,
        QuestionModalComponent,
        ListItemColComponent,
        ReponseFormComponent,

        CategorieQuestionFormComponent,

        QuestionnaireFormComponent,
        PreconisationCategorieQuestionFormComponent,
        EvaluationLoadingComponent,
        EvaluationFooterComponent,
        EvaluationThematiqueComponent,
        EvaluationResultatComponent,
        ResultatItemComponent,
        EvaluationEntrepriseInfoComponent,
        OopsMessageComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true
    }),
    FormsModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSnackBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      unitsColor: "#ffffff",
      titleColor: "#ffffff",
      subtitleColor: "#ffffff",
      animationDuration: 300
    })

  ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}
