import {Component} from '@angular/core';
// @ts-ignore
import {DateTime} from 'luxon';
import packageInfo from './../../../../../package.json';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    public appVersion = packageInfo.version;
    public currentYear: string = DateTime.now().toFormat('y');
}
