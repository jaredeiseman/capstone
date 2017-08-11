import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  contents: string;
  title: string;

  constructor(private svc: PagesService) { }

  ngOnInit() {
    this.svc.getPage('about').subscribe((res) => {
      var data = res.json()[0];

      this.contents = data.contents;
      this.title = data.title;
    });
  }

}
