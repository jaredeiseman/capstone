import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/services/auth.service';
import { AdminService } from './admin/services/admin.service';
import { NavbarPipe } from './pipes/navbar.pipe';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'JaredEiseman.com';
  pagesList: any = null;

  constructor(public auth: AuthService, private router: Router, private admin: AdminService) {}

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.auth.setLoginOnInit();
    this.admin.getPages().subscribe(res => {
      this.pagesList = res.json();
      console.log(this.pagesList);
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  route(route: string) {
    console.log('hi');
    this.router.navigate([route]);
  }
}
