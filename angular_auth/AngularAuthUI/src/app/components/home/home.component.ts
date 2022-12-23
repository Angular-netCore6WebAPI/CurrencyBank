import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Currencies } from 'src/app/classes/currencies';
import ValidateForm from 'src/app/helpers/validateform';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  today = new Date();
  date = this.today.toLocaleDateString();

  currency = new Currencies();

  homeBuyForm!: FormGroup;
  homeSellForm!: FormGroup;

  constructor(
    private home: HomeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.homeBuyForm = this.fb.group({
      buyPrice: ['', Validators.min(0)],
    });
    this.homeSellForm = this.fb.group({
      sellPrice: ['', Validators.min(0)],
    });

    this.currency.name = 'US DOLLAR';
    /*this.home.home().subscribe({
      next: (res) => {
        this.currency.purchase = res.message;
      },
      error: (err) => {
        this.toastr.warning(err.error.message, 'WARNING');
        console.log(err);
      },
    });*/
  }

  showMoneyType(moneyType: string) {
    this.currency.name = moneyType;
    /*this.home.getMoney(this.currency).subscribe({
      next: (res) => {
        this.currency.purchase = res.text;
        this.toastr.success(res.message, 'SUCCESS');
      },
      error: (err) => {
        this.toastr.warning(err.error.message, 'WARNING');
        console.log(err);
      },
    });*/
  }

  buy() {
    if (this.homeBuyForm.valid) {
      //Send the obj to database
      /*this.home.buy(this.currency).subscribe({
        next: (res) => {
          
        },
        error: (err) => {
          this.toastr.warning(err.error.message, 'WARNING');
          console.log(err);
        },
      });*/
    } else {
      this.toastr.error('Form is not valid!', 'ERROR');
      console.log('Form is not valid');
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.homeBuyForm);
    }
  }

  sell() {
    if (this.homeSellForm.valid) {
      //Send the obj to database
      /*this.home.sell(this.currency).subscribe({
        next: (res) => {
          
        },
        error: (err) => {
          this.toastr.warning(err.error.message, 'WARNING');
          console.log(err);
        },
      });*/
    } else {
      this.toastr.error('Form is not valid!', 'ERROR');
      console.log('Form is not valid');
      //throw the error using toaster and with required fields
      ValidateForm.validateAllFormFields(this.homeSellForm);
    }
  }
}
