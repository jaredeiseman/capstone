import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from '../../models/post.model';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router'
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.scss']
})
export class ListPostsComponent implements OnInit {

  posts: any[] = null;
  drafts: any[] = null;

  constructor(private http: Http, private db: DatabaseService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.retrievePosts();
  }

  retrievePosts() {
    this.db.getAllPosts().subscribe(res => {
      this.posts = JSON.parse(res['_body']);
    });
    this.db.getAllDrafts().subscribe(res => {
      this.drafts = JSON.parse(res['_body']);
    });
  }

  getFullPost(post) {
    this.router.navigate(['/blog/post/', post._id]);
  }

  edit(post) {
    this.router.navigate(['/blog/edit/', post._id]);
  }

  delete(post) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.db.delete(post).subscribe(res => {
        if (res.status === 200) { this.retrievePosts() }
      });
    }
  }

}
