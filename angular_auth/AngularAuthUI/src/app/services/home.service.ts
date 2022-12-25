import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCurrency } from '../classes/user-currency';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl: string = 'https://localhost:7164/Home/';

  constructor(private http: HttpClient) {}

  getCurrency(userCurrency: UserCurrency) {
    return this.http.post<any>(`${this.baseUrl}get-currency`, userCurrency);
  }

  purchase(userCurrency: UserCurrency) {
    return this.http.post<any>(`${this.baseUrl}purchase`, userCurrency);
  }

  sale(userCurrency: UserCurrency) {
    return this.http.post<any>(`${this.baseUrl}sale`, userCurrency);
  }
}
