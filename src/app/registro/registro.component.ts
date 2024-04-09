import { Component } from '@angular/core';
import { Register } from '../models/register';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateForm';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  type:string = "password";
  isText: boolean = false;
  eyeIcon : string = "fa-eye-slash"
  signUpForm!: FormGroup;


  constructor(private auth: AuthenticationService, private fb : FormBuilder, private router: Router, private toast:NgToastService){}

  ngOnInit():void{
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      username:['',Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })

  }
  
  hideShowPass(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  
  }

  onSingup(){
    if(this.signUpForm.valid){
      this.auth.register(this.signUpForm.value).subscribe({
        next:(res=>{
          alert(res.message);
          this.toast.success({detail:"Success", summary:res.message,duration:5000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
      }),
      error:(err=>{
        alert(err?.error.message)
      })
    })
      
      
      
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
    }
  }

}
