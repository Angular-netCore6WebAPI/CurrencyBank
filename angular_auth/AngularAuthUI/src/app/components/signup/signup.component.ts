import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required]      
    })
  }

  hideShowPass(){
    this.istext = !this.istext;
    this.istext ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }

  onSignUp(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      //Perform logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    }else{
      console.log("Form is not valid");
      //Logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }
}
