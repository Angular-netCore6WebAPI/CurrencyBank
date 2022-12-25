import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  baseUrl: string = 'https://localhost:7164/';
  constructor(private http: HttpClient) {}

  home(userName: string) {
    return this.http.get<any>(`${this.baseUrl}Home?Username=${userName}`);
  }
  profile(userName: string) {
    return this.http.get<any>(`${this.baseUrl}Profile?Username=${userName}`);
  }
}
