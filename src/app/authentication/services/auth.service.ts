import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  baseURI: string = 'http://localhost:3000/api';
  loggedIn: boolean = false;
  username: string = null;
  isAdmin: boolean = false;
  userFullName: string;
  userFirstName: string;
  userLastName: string;

  constructor(private http: Http) { }

  createUser(user: User) {
    return this.http.post(`${this.baseURI}/createuser`, user);
  }

  login(username, password) {
    return this.http.post(`${this.baseURI}/login`, {username: username, password: password}).subscribe(res => {
      var parsed = res.json();
      if (res.status === 200) {
        if (parsed.permissions === 'admin') {
          this.setLogin(true, username, parsed.firstName, parsed.lastName);
          return true;
        } else {
          this.setLogin(false, username, parsed.firstName, parsed.lastName);
          return true;
        }
      } else {
        return false;
      }
    });
  }

  setLogin(admin: boolean, username: string, firstName: string, lastName: string) {
    if (admin) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.loggedIn = true;
    this.username = username;
    this.userFirstName = firstName;
    this.userLastName = lastName;
    this.userFullName = `${this.userFirstName} ${this.userLastName}`;
  }

}
