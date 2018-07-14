//This service will make sure that any unauthenticated user will be redireted to Login page
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthguardService {
  constructor(private router: Router) {}

  //This method will be called from routing module to check if auth key is present or not
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem("currentUser") != undefined) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
