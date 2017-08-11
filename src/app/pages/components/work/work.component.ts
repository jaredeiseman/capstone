import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  contents: string;
  title: string;

  constructor(private svc: PagesService) { }

  ngOnInit() {
    this.svc.getPage('work').subscribe((res) => {
      var data = res.json()[0];

      this.contents = data.contents;
      this.title = data.title;
    });
  }

}
