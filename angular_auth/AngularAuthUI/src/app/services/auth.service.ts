import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7164/User/"

  constructor(private http : HttpClient) { }

  signUp(userObj : any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj);
  }

  forgotPassword(forgotObj? : any){
    return this.http.post<any>(`${this.baseUrl}forgot-password`,forgotObj);
  }
}
