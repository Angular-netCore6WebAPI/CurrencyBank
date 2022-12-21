import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  user = new User();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      //Send the obj to database
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.userControl(res.text, res.message);
        },
        error: (err) => {
          this.toastr.warning(err.error.message, 'WARNING');
          console.log(err);
        },
      });
    } else {
      this.toastr.error('Form is not valid!', 'ERROR');
      console.log('Form is not valid');
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

  userControl(role: string, message: string) {
    this.user.userName = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    if (role == 'User') {
      this.toastr.success(message, 'SUCCESS');
      this.router.navigate(['home']);
    } else if (role == 'Admin') {
      this.shared.set(this.user);
      this.toastr.success(message, 'SUCCESS');
      this.router.navigate(['admin']);
    } else {
      this.toastr.error(message, 'ERROR');
    }
  }
}
