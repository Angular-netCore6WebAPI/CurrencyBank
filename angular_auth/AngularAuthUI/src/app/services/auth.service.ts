import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7164/Auth/"

  constructor(private http : HttpClient) { }

  signUp(userObj : User){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj : User){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj);
  }

  forgotPassword(forgotObj? : User){
    return this.http.post<any>(`${this.baseUrl}forgot-password`,forgotObj);
  }
}
