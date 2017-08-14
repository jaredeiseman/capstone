import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  page: string;

  constructor(private svc: PagesService) { }

  ngOnInit() {
    this.svc.getPage('root').subscribe(res => {
      this.page = res.json()[0];
    });
  }

}
