import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PagesService } from '../../services/pages.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit, AfterViewChecked {

  page: string;
  contents: string;
  title: string;

  constructor(private route: ActivatedRoute, private location: Location, private svc: PagesService, private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.populateInfo();
      }
    });
  }

  ngOnInit() {
    this.populateInfo();
  }

  ngAfterViewChecked() {
    // this.populateInfo();
  }

  populateInfo() {
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
