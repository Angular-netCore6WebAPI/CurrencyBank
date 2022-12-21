import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user = new User();

  constructor() { }

  set(user : User){
    this.user = user;
  }

  get(){
    return this.user;
  }
}
