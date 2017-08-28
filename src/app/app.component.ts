import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/services/auth.service';
import { AdminService } from './admin/services/admin.service';
import { NavbarPipe } from './pipes/navbar.pipe';
import { ConfigService } from './services/config.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title:string = '';
  pagesList: any = null;
  masterConfig: any = null;

  constructor(public auth: AuthService, private router: Router, private admin: AdminService, private configService: ConfigService) {}

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.auth.setLoginOnInit();
    this.admin.getPages().subscribe(res => {
      this.pagesList = res.json();
      console.log(this.pagesList);
    });

    this.configService.getConfig().subscribe(res => {
      this.masterConfig = res.json()[0];
      this.title = this.masterConfig.siteTitle;
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
