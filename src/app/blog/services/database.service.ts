import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {

  baseURI: string = 'http://localhost:3000/api';

  constructor(private http: Http) { }

  saveNewPost(newPost) {
    return this.http.post(`${this.baseURI}/create`, newPost);
  }

  getAllPosts() {
    return this.http.get(`${this.baseURI}/allposts`);
  }

  getAllDrafts() {
    return this.http.get(`${this.baseURI}/alldrafts`);
  }

  getPost(id) {
    return this.http.get(`${this.baseURI}/post/${id}`);
  }

  updatePost(id, updatedPost) {
    return this.http.post(`${this.baseURI}/update/${id}`, updatedPost);
  }

  delete(post) {
    return this.http.get(`${this.baseURI}/delete/${post._id}`);
  }

  addComment(comment, id) {
    var payload = { comment: comment, id: id };
    return this.http.post(`${this.baseURI}/addcomment`, payload);
  }

}
