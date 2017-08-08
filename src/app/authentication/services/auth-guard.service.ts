import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private router: Router, public auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAdmin) {
      alert('access denied');
      this.router.navigate(['/blog']);
      return false;
    } else {
      return true;
    }
  }
}
