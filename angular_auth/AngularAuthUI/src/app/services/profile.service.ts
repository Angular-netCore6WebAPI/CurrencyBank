import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl: string = 'https://localhost:7164/Profile/';
  constructor(private http: HttpClient) {}

  profile(user: User) {
    return this.http.post<any>(`${this.baseUrl}profile`, user);
  }
}
