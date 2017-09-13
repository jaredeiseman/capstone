import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Comment } from '../../models/comment.model';
import { AuthService } from '../../../authentication/services/auth.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {

  postId: string = null;
  post: any;
  commenting: boolean = false;

  constructor(private db: DatabaseService, private route: ActivatedRoute, private location: Location, private auth: AuthService) { }

  ngOnInit() {

    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['id'];
    });

    this.collectInfo();
  }

  collectInfo() {
    this.db.getPost(this.postId).subscribe(res => {
      this.post = res.json();
    });
  }

  startCommenting(post) {
    this.commenting = true;
  }

  stopCommenting(form: NgForm) {
    var newComment = new Comment(this.auth.userFirstName, form.value.comment);
    this.db.addComment(newComment, this.post._id).subscribe(res => {
      this.commenting = false;
      this.collectInfo();
    });
  }

  formatDate(dateString) {
    var d = new Date(dateString);
    var days: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDay() + 1}, ${d.getFullYear()}`;
  }

}
