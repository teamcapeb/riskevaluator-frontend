import { Component, Input, OnInit } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import ScoreCategory from "@/objects/ScoreCategory";
import IScoreCategory from "@/interfaces/IScoreCategory";
import IEvaluation from "@/interfaces/IEvaluation";
import { EvalTokenStorageService } from "@services/serviceEvaluation/eval-token-storage.service";

@Component({
  selector: 'app-result-radarchart-item',
  templateUrl: './result-radarchart-item.component.html',
  styleUrls: ['./result-radarchart-item.component.scss']
})
export class ResultRadarchartItemComponent implements OnInit {

  evaluation$ : IEvaluation = null;
  scorecategories$ : IScoreCategory[];




  public radarChartLabels: string[] = [];

  public radarChartData: ChartData<'radar'> ;
  public radarChartType: ChartType = 'radar';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(private evalTokenStorageService : EvalTokenStorageService) {
    this.evaluation$ = this.evalTokenStorageService.getEvaluation();
  }
  ngOnInit(): void {
    this.preparePrecoGlobale();
    let data : number[] = this.scorecategories$.sort().map(item => +item.nbPoints);
    this.radarChartLabels = this.scorecategories$.sort().map(item => item.categorieQuestion.libelle);

    this.radarChartData = {
      labels: this.radarChartLabels,

      datasets: [
        { data,label: this.scorecategories$?.at(0).categorie?.questionnaire?.thematique,hitRadius:15,radius:4,hoverRadius:5},
      ]
    };

  }

  preparePrecoGlobale(){
    this.evaluation$ = this.evalTokenStorageService.getEvaluation();


    if(this.evaluation$!=null) {
      this.scorecategories$ = this.evaluation$.scoreCategories.map( cat => {
        let temp = cat.categorieQuestion.preconisationsCategorie;
        cat.categorieQuestion.preconisationsCategorie = temp.filter(item => item.viewIfPourcentageScoreLessThan > cat.nbPoints );
        return cat;
      })
    }
  }
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins:{
      legend: {
        display: false,
        position:"chartArea",

      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
          },
        },

        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, ticks) {
            return   value + ' %';
          }

        }
      }
    }
  };

}
