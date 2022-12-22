import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currencies } from '../classes/currencies';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  baseUrl: string = 'https://localhost:7164/Home/';

  constructor(private http: HttpClient) {}

  home() {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getMoney(currency: Currencies) {
    return this.http.post<any>(`${this.baseUrl}get-money`, currency);
  }

  buy(currency: Currencies) {
    return this.http.post<any>(`${this.baseUrl}buy`, currency);
  }

  sell(currency: Currencies) {
    return this.http.post<any>(`${this.baseUrl}sell`, currency);
  }
}
