import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PagesService } from '../../services/pages.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  pageId: string;
  page = null;
  populated: boolean = false;

  constructor(private route: ActivatedRoute, private location: Location, private svc: PagesService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.pageId = urlParameters['id'];
    });

    this.svc.getPageById(this.pageId).subscribe(res => {
      this.page = res.json()[0];
    });
  }

  ngAfterViewChecked() {
    if (this.page && !this.populated) {
      $('#editor').froalaEditor('html.set', this.page.contents);
      this.populated = true;
    }
  }

  update(form: NgForm) {
    var content = $('div#editor').froalaEditor('html.get');
    var title = form.value.title;
    var route = form.value.route;
    var toUpdate = {
      _id: this.page._id,
      title: title,
      route: route,
      contents: content,
      displayName: form.value.displayName,
      displayInNav: form.value.displayInNav
    }

    this.svc.updatePage(toUpdate).subscribe(res => {
      console.log(res);
      this.router.navigate(['/page', toUpdate.route]);
    });
  }

}
