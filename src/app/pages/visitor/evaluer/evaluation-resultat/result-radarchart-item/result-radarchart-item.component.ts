import { Component, Input, OnInit } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import ScoreCategory from "@/objects/ScoreCategory";
import IScoreCategory from "@/interfaces/IScoreCategory";

@Component({
  selector: 'app-result-radarchart-item',
  templateUrl: './result-radarchart-item.component.html',
  styleUrls: ['./result-radarchart-item.component.scss']
})
export class ResultRadarchartItemComponent implements OnInit {

  @Input() scorecategories$ : IScoreCategory[];

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
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

  ngOnInit(): void {

    let data : number[] = this.scorecategories$.sort().map(item => +item.nbPoints);
    this.radarChartLabels = this.scorecategories$.sort().map(item => item.categorie.libelle);

    this.radarChartData = {
      labels: this.radarChartLabels,
      datasets: [
        { data, label: 'Series A' },
      ]
    };

  }

}
