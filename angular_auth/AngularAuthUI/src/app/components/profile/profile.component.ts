import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user';
import ValidateForm from 'src/app/helpers/validateform';
import { NavService } from 'src/app/services/nav.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  profileForm!: FormGroup;
  user = new User();

  constructor(
    private shared: SharedService,
    private profile: ProfileService,
    private fb: FormBuilder,
    private nav: NavService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.shared.get();

    this.nav.profile(this.user.userName).subscribe({
      next: (res) => {
        this.splitted(res.text);
      },
      error: (err) => {
        this.toastr.warning("Currency info can't accessibly now.", 'WARNING');
        console.log(err);
      },
    });

    this.profileForm = this.fb.group({
      password: [''],
      balance: ['', Validators.min(1)],
      address: [''],
      phoneNumber: ['', Validators.min(1)],
    });
  }
  splitted(text: string) {
    var splitted = text.split(',', 3);
    this.user.firstName = splitted[0];
    this.user.lastName = splitted[1];
    this.user.email = splitted[2];
  }
  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }
  changeProfile() {
    if (this.profileForm.valid) {
      //Send the obj to database
      this.user.password = this.profileForm.value.password;
      this.user.balance = this.profileForm.value.balance;
      this.user.address = this.profileForm.value.address;
      this.user.phoneNumber = this.profileForm.value.phoneNumber;

      this.profile.profile(this.user).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.splitted(res.text);
        },
        error: (err) => {
          this.toastr.warning("Currency info can't accessibly now.", 'WARNING');
          console.log(err);
        },
      });
    } else {
      this.toastr.error('Form is not valid!', 'ERROR');
      console.log('Form is not valid');
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.profileForm);
    }
  }
}
