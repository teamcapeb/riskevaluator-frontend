import {Component} from '@angular/core';
import { QuestionService } from '../../services/serviceQuestion/question.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    constructor(private questionService: QuestionService){
        this.questionService.get('e41d900c-c0a5-4758-8d8a-4c718d4910c7').subscribe((data) => {
            console.log(data);
        });
    }
}
