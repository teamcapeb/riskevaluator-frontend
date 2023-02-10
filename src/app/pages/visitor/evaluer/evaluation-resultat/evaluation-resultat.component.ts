import { Component, Input, OnInit } from "@angular/core";
import IEvaluation from "@/interfaces/IEvaluation";
import IPreconisationGlobale from "@/interfaces/IPreconisationGlobale";
import IScoreCategory from "@/interfaces/IScoreCategory";
import {IOopsMessageInput} from "@components/oops-message/oops-message.component";
import {EvalTokenStorageService} from "@services/serviceEvaluation/eval-token-storage.service";
import IPreconisationCategorieQuestion from "@/interfaces/IPreconisationCategorieQuestion";
import IQuestionnaire from "@/interfaces/IQuestionnaire";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {Alignment, Decoration, Margins} from "pdfmake/interfaces";
import {IEntreprise} from "@/interfaces/IEntreprise";
import {bounceInOnEnterAnimation} from "angular-animations";
import {ChartConfiguration, ChartData, ChartType} from "chart.js";
import { ActivatedRoute, Router } from "@angular/router";
import { EvaluationService } from "@services/serviceEvaluation/evaluation.service";
import { EvaluationApiService } from "@services/serviceEvaluation/evaluation-api.service";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import Immutable from "immutable";
import of = Immutable.List.of;
import { catchError, map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { ModalService } from "@services/serviceModal/modal.service";
import { EvaluationResultatSuppressionComponent } from "./evaluation-resultat-suppression/evaluation-resultat-suppression.component";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {MatDialog} from '@angular/material/dialog';
import { QuestionnaireService } from "@services/serviceQuestionnaire/questionnaire.service";
import Questionnaire from "@/objects/Questionnaire";

export interface DialogData {
  entreprise : IEntreprise,
  thematique : string,
  evaluationID: number
}

@Component({
  selector: 'app-evaluation-resultat',
  templateUrl: './evaluation-resultat.component.html',
  styleUrls: ['./evaluation-resultat.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
  ]

})
export class EvaluationResultatComponent implements OnInit {

  @Input() inputEvaluation : IEvaluation = null;


  evaluationObs:Observable<AppDataState<IEvaluation |null>> = null;

  evaluation$ : IEvaluation = null;
  entreprise$ : IEntreprise =null;

  precoGlobale$ : IPreconisationGlobale = { idPreconisationG: 0, viewIfPourcentageScoreLessThan: 0, contenu: ""};
  questionnaire:IQuestionnaire;
  listScoreCategories$ : IScoreCategory[];
  tempPreco : IPreconisationGlobale[];
  public radarChartLabels: string[] = [];
  public radarChartData: ChartData<'radar'> ;
  public radarChartType: ChartType = 'radar';
  routeEvalId:number;
  evalIdLocalStorage: number;
  evalId:number;
  oopsMessage: IOopsMessageInput  = {
    buttonText: "aller vers evaluation",
    goToUrl: "/evaluer",
    message: "Merci d'aller sur la rubrique évaluer, pour effectuer une évaluation",
    title: "Aucune évaluation n'est trouvée", }
    DataStateEnum = DataStateEnum;

  // MOCK  de la date d'évaluation dans le cas des évalautions précedentes sans date
  defaultDate = "01/01/2000";
  isAdmin : boolean = false;

  constructor( private evalTokenStorageService : EvalTokenStorageService,
               private evaluationApiService : EvaluationApiService,
               private modalService:ModalService,
               private actRoute: ActivatedRoute,
               public dialog: MatDialog,
               private route: Router,
               private questionnaireService: QuestionnaireService
               ) {
    this.routeEvalId = +this.actRoute.snapshot.params['id'];
    this.evalIdLocalStorage = this.evalTokenStorageService.getEvaluationId()
    this.evalId =  this.routeEvalId? this.routeEvalId:this.evalIdLocalStorage;



  }

  ngOnInit(): void {
    if(this.evalId)
      this.onGetSignleEvaluation(this.evalId);
    this.getLogin()
  }

  PreparePreconisationList(){
    if(this.evaluation$!=null) {
      this.preparePrecoGlobale();
      let data : number[] = this.listScoreCategories$?.sort().map(item => +item?.nbPoints);
      this.radarChartLabels = this.listScoreCategories$?.sort().map(item => item?.categorieQuestion?.libelle);

      this.radarChartData = {
        labels: this.radarChartLabels,
        datasets: [
          { data, label: this.listScoreCategories$?.at(0)?.categorieQuestion?.questionnaire?.thematique},
        ]
      };



      const textReducer = (previousValue: string, currentValue: IPreconisationGlobale | IPreconisationCategorieQuestion) => previousValue.concat('\n \n',currentValue.contenu);

      // Take questionnaire from one the scoreCategories
      this.questionnaireService.get(this.evaluation$?.scoreCategories?.at(0)?.categorieQuestion?.questionnaire.idQuestionnaire).subscribe(res =>{
        this.questionnaire = res.toJSON();

      // Take entreprise from evaluation
      this.entreprise$=this.evaluation$?.entreprise;

      // filter preconisation with respect the viewIfpercentage
      this.tempPreco  = this.questionnaire?.preconisationGlobales?.filter(p=> p?.viewIfPourcentageScoreLessThan > this.evaluation$?.scoreGeneraleEvaluation);

      // take one of the Globale preconisation
      this.precoGlobale$ = this.tempPreco?.find(el => el !== undefined)

      // concatenate contenu of all global preconisation to one
      if( this.precoGlobale$ != null && this.precoGlobale$?.contenu !==null)
        this.precoGlobale$.contenu = this.tempPreco?.reduce(textReducer,"");

      this.listScoreCategories$ = this.evaluation$?.scoreCategories?.map( cat => {
        let temp = cat?.categorieQuestion?.preconisationsCategorie;
        cat.categorieQuestion.preconisationsCategorie = temp?.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
        return cat;
      })
    });}

  }

  concatPreconisations(preconisation :any) : string {
    const textReducer = (previousValue: string, currentValue: IPreconisationGlobale | IPreconisationCategorieQuestion) => previousValue.concat('\n \n',currentValue.contenu);
    return preconisation.reduce(textReducer,"");
  }

  htmlToPng() {
    const input = document.getElementById("graphWithTitle");
    html2canvas(input).then(canvas => {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = this.questionnaire?.thematique;
      document.body.appendChild(link);
      link.click();
    });

  }

  getImageGraphe() {

    const input = document.getElementById("graph");
    return html2canvas(input).then(canvas => {

      return canvas.toDataURL();
    });

  }

  async generatePDF() {
    let wEntreprise=this.entreprise$
    let thematiqueConcat = this.questionnaire?.thematique.replace(/ /g, "_").replace(/'/g,"_");
    let entrepriseConcat = wEntreprise.nomEntreprise.replace(/ /g, "_").replace(/'/g,"_");
    let dateEvaluationConcat = this.evaluation$.date.replace(/\//g, "-");
    let docTitle = 'CAPEB-Evaluator-'+entrepriseConcat+'-'+thematiqueConcat+'-'+dateEvaluationConcat+'.pdf';

    let docDefinition = {
      header: {
        stack: [
            {text: 'CAPEB Evaluator'}
        ],
        margin: [30, 10, 0, 0] as Margins
      },
      content: [
        {
          text:'Résultat de l\'évaluation du '+this.evaluation$.date,
          alignment: 'center' as Alignment,
          fontSize:20,
          bold: true,
          color:'black'
        },
        {
          text: this.questionnaire?.thematique,
          fontSize: 16,
          bold: true,
          alignment: 'center' as Alignment,
          decoration: 'underline' as Decoration,
          color: '#E63329'
        },{
          text: 'Entreprise',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: ''+wEntreprise?.nomEntreprise,
                bold: true
              },
              { text: 'SIRET: '+wEntreprise?.noSiret },
              { text: 'Date de création: '+wEntreprise?.anneeDeCreation },
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right' as Alignment
              }
            ]
          ]
        }
        ,
        {
          image: await this.getImageGraphe() ,
          width:600,
          alignment : 'center' as Alignment
        },{
          text: 'Resultat globale: '+this.evaluation$.scoreGeneraleEvaluation+'%',
          style: 'sectionHeader'
        },{
          table:{
            headerRows:1,
            widths: ['*'],
            body:[
              ['Préconisations globale'],
              ...this.tempPreco.map(wPreconisation=>[wPreconisation.contenu]),
            ]
          }
        }
      ],styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline'as Decoration,
          fontSize: 14,
          margin: [0, 15, 0, 15] as Margins
        }
      }
    };
    this.listScoreCategories$?.forEach(wScoreCategorie=>{
      docDefinition.content.push({
        text: wScoreCategorie.categorieQuestion.libelle+': '+wScoreCategorie.nbPoints+'%',
        style: 'sectionHeader'
      },{
        table:{
          headerRows:1,
          widths: ['*'],
          body:[
            ['Préconisations ('+wScoreCategorie.categorieQuestion.libelle+')'],
            ...wScoreCategorie.categorieQuestion.preconisationsCategorie.map(wPreconisation=>([wPreconisation.contenu])),
          ]
        }
      })
    })
    pdfMake.createPdf(docDefinition).download(docTitle);

  }

  preparePrecoGlobale(){
    if(this.evaluation$!=null) {
      this.listScoreCategories$ = this.evaluation$?.scoreCategories.map( cat => {
        let temp = cat.categorieQuestion.preconisationsCategorie;
        cat.categorieQuestion.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
        return cat;
      })
    }
  }

  onGetSignleEvaluation(id : number) {
    this.evaluationObs = this.evaluationApiService.get(id).pipe(
      map((data: IEvaluation)=>{
        this.evaluation$ = data;
        this.evaluation$.entreprise = data.entreprise;
        this.PreparePreconisationList();
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        this.modalService.error(JSON.stringify(err.message));
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }

  /** Affiche la pop-up de validation de la suppression */
  deleteResult(): void {
    this.dialog.open(EvaluationResultatSuppressionComponent, {
      width: '500px',
      height: '180px',
      data: {
        entreprise: this.entreprise$,
        thematique: this.listScoreCategories$?.at(0)?.categorieQuestion?.questionnaire?.thematique,
        evaluationID : this.evaluation$.idEvaluation
      },
    });
  }

  back(){
    this.route.navigate(["entreprise", this.entreprise$.noSiret]);
  }

    /**
   * Méthode pour récupérer le numéro de siret de l'entreprise
   */
    getLogin() {
      let isAdminTemp = this.actRoute.snapshot.paramMap.get('isAdmin');
      this.isAdmin = (isAdminTemp === 'true');
      console.log(this.isAdmin);
    }
}
