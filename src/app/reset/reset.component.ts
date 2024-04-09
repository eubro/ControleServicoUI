import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../models/reset-password';
import { ConfirmPasswordValidator } from '../helpers/confirm-password.validator';
import { ActivatedRoute, Route, Router } from '@angular/router';
import ValidateForm from '../helpers/validateForm';
import { ResetPasswordService } from '../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(private fb: FormBuilder,private router:Router,private toast: NgToastService, private activatedRoute: ActivatedRoute, private resetService: ResetPasswordService){}

  ngOnInit(): void {
      this.resetPasswordForm = this.fb.group({
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required]
      },{validator: ConfirmPasswordValidator("password","confirmPassword")});

      this.activatedRoute.queryParams.subscribe(val=>{
        this.emailToReset = val['email'];
        let uriToken =val['code'];
        this.emailToken = val['code'];
        console.log(this.emailToken);
        console.log(this.emailToReset)
      })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj).subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'SUCCESS',
            summary:"Senha redefinida com sucesso",
            duration:3000,
          });
          this.router.navigate(['/'])

        },
        error:(err)=>{
          this.toast.error({
            detail:'ERROR',
            summary:"Algo deu errado",
            duration:3000,
          });

        }
      })
    }else{
      ValidateForm.validateAllFormFields(this.resetPasswordForm);
    }
  }

}
