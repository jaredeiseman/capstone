import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {

  page: string;
  contents: string;
  title: string;

  constructor(private route: ActivatedRoute, private location: Location, private svc: PagesService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.page = urlParameters['title'];
    });

    this.svc.getPage(this.page).subscribe(res => {
      var data = res.json()[0];
      this.title = data.title;
      this.contents = data.contents;
    });
  }

}
