import {
    Component,
    OnInit,
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';
import { AuthService } from "@services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

      form: any = {};
      isSuccessful = false;
      isSignUpFailed = false;
      errorMessage = '';


    constructor(
        private toastr: ToastrService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required]),
            retypePassword: new FormControl(null, [Validators.required])
        });
    }

    onSubmit() {
      this.authService.register(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
}
