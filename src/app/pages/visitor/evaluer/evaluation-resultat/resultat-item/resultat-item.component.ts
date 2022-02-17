import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
@Component({
  selector: 'app-resultat-item',
  templateUrl: './resultat-item.component.html',
  styleUrls: ['./resultat-item.component.scss']
})
export class ResultatItemComponent implements OnInit {
  @ViewChild('circleProgress') circleProgress: CircleProgressComponent;

  @Input() isGlobal$: boolean = false;
  @Input() text$ : string = null;
  @Input() title$ : string = null;
  @Input() percentage$: number;

  state = "closed";


  showMore: Boolean;
  ngCircleOptions: any;

  emptyTxt = `Aucune préconisation pour ce score`;

  constructor() {

  }

  ngOnInit(): void {
    this.state = "open";
    this.text$ = this.text$??this.emptyTxt;
    this.showMore = this.text$.length <= 300;
    const calculateColor = (percent: number): string[] => {
      if(percent < 25){
        return  ["#e33b1a","rgba(227,59,26,0.43)"] ;
      }else if(percent < 50){
        return ["#ffec00","rgba(255,236,0,0.41)"];
      }else if(percent < 75){
        return ["#009bff","rgba(0,155,255,0.46)"];
      }else{
        return ["#78C000","rgba(120,192,0,0.45)"];
      }
      return [];
    }

    this.ngCircleOptions = {
      percent: this.percentage$,
      radius: 50,
      animation: true,
      animationDuration: 600,
      showBackground: false,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      startFromZero: true,
      innerStrokeColor: calculateColor(this.percentage$)[1],
      showSubtitle: false,
      outerStrokeColor : calculateColor(this.percentage$)[0]
    }
  }
}
