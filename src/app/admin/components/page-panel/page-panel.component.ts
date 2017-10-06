import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-panel',
  templateUrl: './page-panel.component.html',
  styleUrls: ['./page-panel.component.scss']
})
export class PagePanelComponent implements OnInit {
  pages: any;
  displayForm: boolean = false;

  constructor(private svc: AdminService, private router: Router) { }

  ngOnInit() {
    this.getPages();
  }

  getPages() {
    this.svc.getPages().subscribe(res => {
      this.pages = res.json();
    });
  }

  edit(page) {
    this.router.navigate([`/page/edit/${page._id}`]);
  }

  delete(page) {
    if (confirm('Are you sure you want to delete this page?')) {
      this.svc.deletePage(page).subscribe(res => {
        if (res.status === 200) { this.getPages(); }
      })
    }
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

}
