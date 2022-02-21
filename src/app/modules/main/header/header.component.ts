import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {AppService} from '@services/serviceUser/app.service';
import { TokenStorageService } from "@services/serviceUser/token-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
    public searchForm: FormGroup | undefined;
    isLoggedIn: boolean;

    constructor(private tokenStorageService: TokenStorageService) {}

    ngOnInit() {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      this.searchForm = new FormGroup({
            search: new FormControl(null)
        });
    }
}
