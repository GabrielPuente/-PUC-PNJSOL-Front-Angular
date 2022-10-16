import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  getLoggedUser() {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  getToken() {
    return this.getLoggedUser()?.token;
  }

  logout() {
    localStorage.removeItem("user")
  }
}
