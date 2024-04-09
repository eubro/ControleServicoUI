import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/TokenApiModel';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "User/register"
  loginUrl= "User/login"
  refreshUrl = "User/refresh"
  private userPayload:any;

  constructor(private http : HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  public register(userObj: any){

    return this.http.post<any>(`${environment.apiUrl}/${this.registerUrl}`, userObj);
   }

   public login(loginObj: any){
    
    return this.http.post<any>(`${environment.apiUrl}/${this.loginUrl}`, loginObj );
   }
   signOut(){
    localStorage.clear();
    this.router.navigate(['login'])


   }

   storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
   }

   storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

   getToken(){
    return localStorage.getItem('token')
   }
   getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }


   isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
   }

   decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
   }

   getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;

   }

   getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;

   }
   renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${environment.apiUrl}/${this.refreshUrl}`, tokenApi )
  }
}
