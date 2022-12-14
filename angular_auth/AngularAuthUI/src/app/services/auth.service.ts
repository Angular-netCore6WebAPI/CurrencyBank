import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7290/"
  constructor(private http: HttpClient) { }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}Register`,userObj)
  }
  
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Login`,loginObj)
  }
}