import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  type: string = "Password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      FirstName:['', Validators.required],
      Lastname:['', Validators.required],
      UserName:['', Validators.required],
      Email:['', Validators.required],
      Password:['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "Password";
  }

  onSignup(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      //Perform logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err.error.message)
        })
      })
    }else{
      console.log("Form is not valid");
      //logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }
}