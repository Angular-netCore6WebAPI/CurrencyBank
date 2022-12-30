import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/classes/user';
import { AdminService } from 'src/app/services/admin.service';
import { SharedService } from 'src/app/services/shared.service';
import ValidateForm from 'src/app/helpers/validateform';
import { UserType } from 'src/app/classes/user-type';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  adminForm!: FormGroup;

  adm = new User();
  user = new User();

  userType!: UserType[];
  typeSelected: Number = 0;

  value1: String = '';
  value2: String = '';

  constructor(
    private fb: FormBuilder,
    private admin: AdminService,
    private toastr: ToastrService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.adm = this.shared.get();
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  search() {
    if (this.adminForm.valid) {
      //Send the obj to database
      this.admin.userSearch(this.adminForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.userSplitted(res.text);
          this.roleControl(this.user.role);
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
      ValidateForm.validateAllFormFields(this.adminForm);
    }
  }

  userSplitted(text: string) {
    var splitted = text.split(',', 4);
    this.user.firstName = splitted[0];
    this.user.lastName = splitted[1];
    this.user.userName = splitted[2];
    this.user.role = splitted[3];
  }

  roleControl(role: string) {
    this.userType = [
      { Id: 1, Type: 'User' },
      { Id: 2, Type: 'Admin' },
    ];
    if (role == 'User') {
      this.typeSelected = 1;
    } else if (role == 'Admin') {
      this.typeSelected = 2;
    }
  }

  changeRole() {
    if (this.adminForm.valid) {
      //Send the obj to database
      this.user.userName = this.adminForm.value.username;
      this.user.role =
        (<HTMLSelectElement>document.getElementById('roles')).value == '1'
          ? 'User'
          : 'Admin';
      this.admin.changeRole(this.user).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
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
      ValidateForm.validateAllFormFields(this.adminForm);
    }
  }

  deleteUser() {
    if (this.adminForm.valid) {
      //Send the obj to database
      this.admin.deleteUser(this.adminForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
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
      ValidateForm.validateAllFormFields(this.adminForm);
    }
  }
}
