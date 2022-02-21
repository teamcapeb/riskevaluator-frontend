import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "@services/serviceUser/token-storage.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.scss']
})
export class SignupLoginComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  navigateTo(route : string) {
    this.router.navigateByUrl(route);
  }
}
