import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Post } from '../../models/post.model';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
declare var jquery:any;
declare var $ :any;
// import * as $ from 'jquery';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  froalaOptions: Object = {
    height: 600
  }

  constructor(private http: Http, public db: DatabaseService, public router: Router, private auth: AuthService) {
    // if (!this.auth.loggedIn) {
    //   this.router.navigate(['/blog']);
    // }
  }

  ngOnInit() {
  }

  createPost(form) {
    var tags = form.value.tags.replace(' ', '').split(',');
    var content = $('div#editor').froalaEditor('html.get');
    var newPost = new Post(form.value.title, form.value.category, tags, content, (form.value.draft == 'true'), this.auth.userFullName);
    console.log(newPost);
    this.db.saveNewPost(newPost).subscribe(res => {
      if (res.status === 200) this.router.navigate(['/blog']);
    });
  }
}
