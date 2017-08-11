import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contents: string;
  title: string;

  constructor(private svc: PagesService) { }

  ngOnInit() {
    this.svc.getPage('contact').subscribe((res) => {
      var data = res.json()[0];

      this.contents = data.contents;
      this.title = data.title;
    });
  }

}
