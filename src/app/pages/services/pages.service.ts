import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PagesService {

  baseURI: string = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  getPage(page: string) {
    return this.http.get(`${this.baseURI}/page/${page}`);
  }

}
