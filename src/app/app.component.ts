import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/services/auth.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'JaredEiseman.com';

  constructor(public auth: AuthService, private router: Router) {}

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.auth.setLoginOnInit();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
