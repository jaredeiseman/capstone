import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http } from '@angular/http';
import { DatabaseService } from '../../services/database.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit, AfterViewChecked {

  postId: string;
  post = null;
  populated = false;
  tags: string = null;

  constructor(private db: DatabaseService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['id'];
    });

    this.db.getPost(this.postId).subscribe(res => {
      this.post = res.json();
    });
  }

  ngAfterViewChecked() {
    if (this.post && !this.populated) {
      $('#editor').froalaEditor('html.set', this.post.contents);
      $('#tags').val(this.post.tags.join(', '));
      switch (this.post.draft) {
        case true: $('#draft-true').attr('checked', true); break;
        case false: $('#draft-false').attr('checked', true); break;
      }
      this.populated = true;
    }
  }

  updatePost(form: NgForm) {
    var content = $('div#editor').froalaEditor('html.get');
    var tags = $('#tags').val().split(', ');
    var draft: boolean = $('input[type="radio"]:checked').val() == 'true';
    var mutatedTags = []
    tags.forEach((tag) => {
      mutatedTags.push(tag.replace(/^\s+|\s+$/gm,''));
    });
    var updatedPost = new Post(form.value.title, form.value.category, mutatedTags, content, draft);
    this.db.updatePost(this.post._id, updatedPost).subscribe(res => {
      console.log(res);
    });
  }

}
