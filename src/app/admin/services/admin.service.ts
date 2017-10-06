import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdminService {

  baseURI: string = environment.baseURI;

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(`${this.baseURI}/getusers`);
  }

  updateUser(user) {
    return this.http.post(`${this.baseURI}/updateuser`, user);
  }

  deleteUser(user) {
    return this.http.post(`${this.baseURI}/deleteuser`, user);
  }

  getPages() {
    return this.http.get(`${this.baseURI}/listpages`);
  }

  createPage(page) {
    return this.http.post(`${this.baseURI}/createpage`, page);
  }

  deletePage(page) {
    return this.http.post(`${this.baseURI}/deletepage`, page);
  }
}
