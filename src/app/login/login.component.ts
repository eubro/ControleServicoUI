import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateForm';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../services/user-store.service';
import { ResetPasswordService } from '../services/reset-password.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  type:string = "password";
  isText: boolean = false;
  eyeIcon : string = "fa-eye-slash"
  loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!:boolean;
 

  constructor(private fb: FormBuilder, private auth : AuthenticationService, private router : Router, 
    private toast:NgToastService, private userStore: UserStoreService, private resetService : ResetPasswordService){}
  
ngOnInit(){
  this.loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['', Validators.required]
  });

}

hideShowPass(){
  this.isText = !this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";

}

onLogin(){
  if(this.loginForm.valid){

    this.auth.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['sidebar'])
      },
      error:(err)=>{
        
        this.toast.error({detail:"ERROR", summary:"something seems wrong!",duration:5000});
          
        
      }
    })

  }else{
    ValidateForm.validateAllFormFields(this.loginForm);
  }
}

checkValidEmail(event: string){
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}

ConfirmToSend(){
  if(this.checkValidEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
    

    this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
      next:(res)=>{
        this.toast.success({
          detail:'Success',
          summary:'Email enviado!',
          duration:5000,
        });
        this.resetPasswordEmail="";
        const buttonRef = document.getElementById("closeBtn");
        buttonRef?.click();
      },
      error:(err)=>{
        this.toast.error({
          detail: 'ERROR',
          summary:'Algo está errado',
          duration: 5000,
        });
      }
    })
  }
}
  
}
