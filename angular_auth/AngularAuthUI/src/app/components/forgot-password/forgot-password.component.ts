import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm!: FormGroup;

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router){}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]     
    })
  }

  onSubmit(){
    this.router.navigate(['login']);
    /*if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value);

      this.auth.forgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
          this.forgotPasswordForm.reset();
          //this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }else{
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.forgotPasswordForm);
      alert("Your form is invalid");
    }*/
  }
  
}
