import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/serviceUser/app.service';
import { TokenStorageService } from "@services/serviceUser/token-storage.service";

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
        name: 'Accueil',
        path: ['/'],
        icon: "fa-solid fa-landmark"
    },
    {
        name: 'Evaluer',
        path: ['/evaluer'],
        icon: "fa-solid fa-list-check"
    },
    {
        name: 'Evaluation précédente',
        path: ['/historiques'],
        icon: "fa-solid fa-chart-pie"
    },
    {
        name: 'Contact',
        path: ['/contact'],
        icon: "fa-solid fa-address-card"
    },
    {
      name: 'À propos',
      path: ['/privacy-policy'],
      icon: "fa-solid fa-circle-info"
    }
    ];

export const ADMIN_MENU = [
  {
    name: 'Gestion questionnaire',
    path: ['/gestion-questionnaires'],
    icon: "fa-solid fa-atom"

  },
  {
    name: 'Gestion métiers',
    path: ['/gestion-metiers'],
    icon: "fa-solid fa-atom"
  },
  {
    name: 'Consulter évaluation',
    path: ['/consulter-evaluation'],
    icon: "fa-solid fa-list"
  }
];
