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
  postExcerpts: string[] = null;

  constructor(private http: Http, private db: DatabaseService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.retrievePosts();
  }

  retrievePosts() {
    this.db.getAllPosts().subscribe(res => {
      this.posts = JSON.parse(res['_body']);
      this.posts.forEach((post) => {
        var excerpt = post.contents.slice(0, 50);
        excerpt = excerpt + '...';
        post.excerpt = excerpt;
      });
    });
  }

  getFullPost(post) {
    this.router.navigate(['/blog/post/', post._id]);
  }

  formatDate(dateString) {
    var d = new Date(dateString);
    var days: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDay() + 1}, ${d.getFullYear()}`;
  }

}
