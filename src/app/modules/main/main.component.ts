import {AfterViewInit, Component, HostBinding, OnInit, Renderer2} from '@angular/core';
import {AppService} from '@services/serviceUser/app.service';
import { ADMIN_MENU, MENU } from "@modules/main/menu-sidebar/menu-sidebar.component";
import { TokenStorageService } from "@services/serviceUser/token-storage.service";
import { ToastrService } from "ngx-toastr";
import { IUser } from "@/interfaces/IUser";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    @HostBinding('class') class = 'wrapper';
    public sidebarMenuOpened = true;



  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  user:IUser;

  constructor(private renderer: Renderer2,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
  ) {}

    ngOnInit() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );


      this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
          this.user = this.tokenStorageService.getUser();
          this.roles = this.user.roles;

          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

          if(this.showAdminBoard)  this.toastr.info("Vous êtes connecté en tant qu'administrateur","Rôle Administrateur")

          this.username = this.user.username;
        }
        this.toggleMenuSidebar()
      }


    toggleMenuSidebar() {
        if (this.sidebarMenuOpened) {
            this.renderer.removeClass(
                document.querySelector('app-root'),
                'sidebar-open'
            );
            this.renderer.addClass(
                document.querySelector('app-root'),
                'sidebar-collapse'
            );
            this.sidebarMenuOpened = false;
        } else {
            this.renderer.removeClass(
                document.querySelector('app-root'),
                'sidebar-collapse'
            );
            this.renderer.addClass(
                document.querySelector('app-root'),
                'sidebar-open'
            );
            this.sidebarMenuOpened = true;
        }
    }
}
