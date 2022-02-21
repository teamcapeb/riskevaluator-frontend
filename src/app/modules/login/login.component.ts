import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/serviceUser/app.service';
import { TokenStorageService } from "@services/serviceUser/token-storage.service";
import { AuthService } from "@services/serviceUser/auth.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ModalService } from '@services/serviceModal/modal.service';

// @ts-nocheck

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(
          private toastr: ToastrService,
          private authService: AuthService,
          private tokenStorage: TokenStorageService,
          private router: Router,
          private modalService: ModalService
      ) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['']);
      },
      err => {
        console.log(err);
        this.modalService.error(JSON.stringify(err.error));
        this.errorMessage =  err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
