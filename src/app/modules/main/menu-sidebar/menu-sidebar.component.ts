import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import { TokenStorageService } from "@services/token-storage.service";

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    public user: any;
    public menu = MENU;
    public adminMenu = ADMIN_MENU;


    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    username: string;


    constructor(private tokenStorageService: TokenStorageService) {}

    ngOnInit() {
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        this.user = this.tokenStorageService.getUser();
        this.roles = this.user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

        this.username = this.user.username;
      }
    }
}

export const MENU = [
    {
        name: 'Acceuil',
        path: ['/'],
        icon: "fas fa-tachometer-alt"
    },
    {
        name: 'Evaluer',
        path: ['/evaluer'],
        icon: "fas fa-tachometer-alt"
    },
    {
        name: 'Historiques',
        path: ['/historiques'],
        icon: "fas fa-tachometer-alt"
    },
    {
        name: 'Contact',
        path: ['/contact'],
        icon: "fas fa-tachometer-alt"
    }
    ];

export const ADMIN_MENU = [
  {
    name: 'Gestion questionnaire',
    path: ['/gestion-questionnaire'],
    icon: "fas fa-tachometer-alt"

  },
  {
    name: 'Gestion métiers',
    path: ['/gestion-metiers'],
    icon: "fas fa-tachometer-alt"
  },
  {
    name: 'Gestion Comptes',
    path: ['/gestion-compte'],
    icon: "fas fa-tachometer-alt"
  }
];
