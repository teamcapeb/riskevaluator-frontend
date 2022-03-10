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
import { Observable, of } from "rxjs";
import { AppDataState, DataStateEnum } from "@/state/questionnaire.state";
import ICategorieQuestion from "@/interfaces/ICategorieQuestion";
import { IUser } from '@/interfaces/IUser';
import { catchError, map, startWith } from "rxjs/operators";

// @ts-nocheck

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login$:Observable<AppDataState<IUser>> |null=null;
  DataStateEnum = DataStateEnum;
  form: any = {};
    isLoggedIn = false;
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
    this.login$= this.authService.login(this.form).pipe(
      map((data: IUser)=>{

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['']);

        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=> {
        if(err?.status === 500)
        {
          return of({dataState:DataStateEnum.ERROR, errorMessage:"L'utilisateur est introuvable, merci de créer un compte"})
        }else {
          this.modalService.error(JSON.stringify(err.message));
        }
        return of({dataState:DataStateEnum.ERROR, errorMessage:err.message})
      })
    );
  }


  reloadPage() {
    window.location.reload();
  }
}
