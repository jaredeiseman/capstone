import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AdminService {

  baseURI: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(`${this.baseURI}/api/getusers`);
  }

}
