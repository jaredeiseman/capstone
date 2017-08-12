import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AdminService {

  baseURI: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(`${this.baseURI}/api/getusers`);
  }

  updateUser(user) {
    return this.http.post(`${this.baseURI}/api/updateuser`, user);
  }

  deleteUser(user) {
    return this.http.post(`${this.baseURI}/api/deleteuser`, user);
  }

  getPages() {
    return this.http.get(`${this.baseURI}/api/listpages`);
  }

  createPage(page) {
    return this.http.post(`${this.baseURI}/api/createpage`, page);
  }
}
