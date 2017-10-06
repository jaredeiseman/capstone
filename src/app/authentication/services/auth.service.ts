import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  baseURI: string = environment.baseURI;
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

    var toStorage = JSON.stringify({
      loggedIn: this.loggedIn,
      username: this.username,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userFullName: this.userFullName,
      isAdmin: this.isAdmin,
      timestamp: Date.now()
    });

    localStorage.setItem('user', toStorage);
  }

  setLoginOnInit() {
    if (localStorage['user']) {
      var sessionData = JSON.parse(localStorage['user']);
      if ((Date.now() - sessionData.timestamp) > (1000*60*60*24*7)) { // 7 days
        localStorage.clear();
        return;
      } else if (!this.loggedIn) {
        this.setLogin(sessionData.isAdmin, sessionData.username, sessionData.userFirstName, sessionData.userLastName);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.loggedIn = false;
    this.username = null;
    this.isAdmin = false;
    this.userFullName = null;
    this.userFirstName = null;
    this.userLastName = null;
  }

}
