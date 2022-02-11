import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {DateTime} from 'luxon';
import { TokenStorageService } from "@services/serviceUser/token-storage.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    username: string;
    user:any;
    constructor(private tokenStorageService: TokenStorageService) {}

    ngOnInit(): void {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        this.user = this.tokenStorageService.getUser();
        this.roles = this.user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

        this.username = this.user.username;
      }
    }

    logout() {
      this.tokenStorageService.signOut();
      window.location.reload();
    }

    formatDate(date: any) {
        if(date == null) return "01/01/2001";
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
