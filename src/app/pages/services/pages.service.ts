import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PagesService {

  baseURI: string = environment.baseURI;

  constructor(private http: Http) { }

  getPage(page: string) {
    return this.http.get(`${this.baseURI}/page/${page}`);
  }

  getPageById(id: string) {
    return this.http.get(`${this.baseURI}/page/edit/${id}`);
  }

  updatePage(toUpdate) {
    return this.http.post(`${this.baseURI}/page/update`, toUpdate);
  }

}
