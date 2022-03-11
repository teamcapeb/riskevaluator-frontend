import {Injectable} from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AppService} from '@services/serviceUser/app.service';
import { TokenStorageService } from '../services/serviceUser/token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService, private tokenStorageService: TokenStorageService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.getProfile();
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
      return true
        return this.canActivate(next, state);
    }

    async getProfile() {
        if (this.tokenStorageService.getUser()) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
/*
        try {
            await this.appService.getProfile();
            return true;
        } catch (error) {
            return false;
        }
*/
    }
}
