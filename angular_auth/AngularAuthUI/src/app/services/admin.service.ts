import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = 'https://localhost:7164/Admin/';

  constructor(private http: HttpClient) {}

  userSearch(userObj: User) {
    return this.http.post<any>(`${this.baseUrl}search-and-get-user`, userObj);
  }

  changeRole(userObj: User) {
    return this.http.post<any>(`${this.baseUrl}change-role`, userObj);
  }

  deleteUser(userObj: User) {
    return this.http.post<any>(`${this.baseUrl}delete-user`, userObj);
  }
}
