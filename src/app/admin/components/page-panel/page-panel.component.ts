import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-page-panel',
  templateUrl: './page-panel.component.html',
  styleUrls: ['./page-panel.component.scss']
})
export class PagePanelComponent implements OnInit {
  pages: any;

  constructor(private svc: AdminService) { }

  ngOnInit() {
    this.svc.getPages().subscribe(res => {
      this.pages = res.json();
    });
  }

}
