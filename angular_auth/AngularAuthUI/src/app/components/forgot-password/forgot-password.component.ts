import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  forgotPasswordForm!: FormGroup;

  constructor(
    private fb : FormBuilder, 
    private auth : AuthService, 
    private router : Router,
    private toastr : ToastrService
    ){}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required]     
    })
  }

  onSubmit(){
    if(this.forgotPasswordForm.valid){
      console.log(this.forgotPasswordForm.value);

      this.auth.forgotPassword(this.forgotPasswordForm.value)
      .subscribe({
        next:(res)=>{
          this.toastr.success(res.message, 'SUCCESS');
          this.forgotPasswordForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toastr.warning(err.error.message, 'WARNING')
          console.log(err);
        }
      })

    }else{
      this.toastr.error('Form is not valid!', 'ERROR')
      console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.forgotPasswordForm);
    }
  }
  
}
