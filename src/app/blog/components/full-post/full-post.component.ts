import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-post',
  templateUrl: './full-post.component.html',
  styleUrls: ['./full-post.component.scss']
})
export class FullPostComponent implements OnInit {

  postId: string = null;
  post: any;

  constructor(private db: DatabaseService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {

    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['id'];
    });

    this.db.getPost(this.postId).subscribe(res => {
      this.post = res.json();
      console.log(this.post);
    });
  }

}
