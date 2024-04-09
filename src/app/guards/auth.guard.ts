import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NgToastService } from 'ng-angular-popup';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router, private toast: NgToastService){

  }
  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toast.error({detail:"ERROR", summary:"por favor, faça login primeiro!"})
      this.router.navigate(['login'])
      return false;
    }
  }
}
