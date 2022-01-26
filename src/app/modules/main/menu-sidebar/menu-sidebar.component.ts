import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    public user: any;
    public menu = MENU;
    public adminMenu = ADMIN_MENU;

    constructor(public appService: AppService) {}

    ngOnInit() {
        this.user = this.appService.user;
    }
}

export const MENU = [
    {
        name: 'Acceuil',
        path: ['/']
    },
    {
        name: 'Evaluer',
        path: ['/blank']
    },
    {
        name: 'Historiques',
        path: ['/Historiques']
    },
    {
        name: 'Contact',
        path: ['/Contact']
    }
    ];

export const ADMIN_MENU = [
  {
    name: 'Gestion questionnaire',
    path: ['/gestion_questionnaire']
  },
  {
    name: 'Gestion métiers',
    path: ['/gestion_metiers']
  },
  {
    name: 'Gestion Comptes',
    path: ['/gestion_compte']
  }
];
