import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Currencies } from 'src/app/classes/currencies';
import { User } from 'src/app/classes/user';
import { UserCurrency } from 'src/app/classes/user-currency';
import ValidateForm from 'src/app/helpers/validateform';
import { HomeService } from 'src/app/services/home.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  today = new Date();
  date = this.today.toLocaleDateString();

  currency = new Currencies();

  hm = new User();
  userCurrency = new UserCurrency();

  homeBuyForm!: FormGroup;
  homeSellForm!: FormGroup;

  sumMoney!: number;

  constructor(
    private home: HomeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.hm = this.shared.get();

    this.homeBuyForm = this.fb.group({
      buyAmount: ['', Validators.min(1)],
    });
    this.homeSellForm = this.fb.group({
      sellAmount: ['', Validators.min(1)],
    });

    this.currency.name = 'US DOLLAR';
    this.userCurrency.currencyName = 'US DOLLAR';
    this.home.home(this.hm.userName).subscribe({
      next: (res) => {
        this.splitted(res.text);
      },
      error: (err) => {
        this.toastr.warning("Currency info can't accessibly now.", 'WARNING');
        console.log(err);
      },
    });
  }

  splitted(text: string) {
    var splitted = text.split(',', 4);
    this.currency.purchase = +splitted[0];
    this.currency.sale = +splitted[1];
    this.hm.balance = +splitted[2];
    this.sumMoney = +splitted[3];
  }

  userCurrenySplitted(text: string) {
    var splitted = text.split(',', 3);
    this.currency.purchase = +splitted[0];
    this.currency.sale = +splitted[1];
    this.sumMoney = +splitted[2];
  }

  showMoneyType(moneyType: string) {
    this.homeBuyForm.reset();
    this.homeSellForm.reset();
    this.currency.name = moneyType;
    this.userCurrency.userName = this.hm.userName;
    this.userCurrency.currencyName = moneyType;

    this.home.getCurrency(this.userCurrency).subscribe({
      next: (res) => {
        this.userCurrenySplitted(res.text);
      },
      error: (err) => {
        this.toastr.warning("Currency info can't accessibly now.", 'WARNING');
        console.log(err);
      },
    });
  }

  purchaseSplitted(text: string) {
    var splitted = text.split(',', 4);
    this.hm.balance = +splitted[0];
    this.sumMoney = +splitted[1];
  }

  purchase() {
    if (this.homeBuyForm.valid) {
      //Send the obj to database
      this.userCurrency.userName = this.hm.userName;
      this.userCurrency.price = this.currency.purchase;
      this.userCurrency.amount = this.homeBuyForm.value.buyAmount;
      this.userCurrency.type = 'Purchase';

      console.log(this.userCurrency);

      this.home.purchase(this.userCurrency).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.purchaseSplitted(res.text);
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
      ValidateForm.validateAllFormFields(this.homeBuyForm);
    }
  }

  sale() {
    if (this.homeSellForm.valid) {
      //Send the obj to database
      this.userCurrency.userName = this.hm.userName;
      this.userCurrency.price = this.currency.sale;
      this.userCurrency.amount = this.homeSellForm.value.sellAmount;
      this.userCurrency.type = 'Sale';
      console.log(this.userCurrency);

      this.home.sale(this.userCurrency).subscribe({
        next: (res) => {
          this.toastr.success(res.message, 'SUCCESS');
          this.purchaseSplitted(res.text);
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
      ValidateForm.validateAllFormFields(this.homeSellForm);
    }
  }
}
