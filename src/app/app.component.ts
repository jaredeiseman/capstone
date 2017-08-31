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
  globalStyles: string = null;
  stylesPopulated: boolean = false;

  constructor(public auth: AuthService, private router: Router, private admin: AdminService, private configService: ConfigService) {}

  ngAfterViewChecked() {
    if (!this.stylesPopulated && this.globalStyles !== null) {
      this.stylesPopulated = true;
      $('#global-styles').html(this.globalStyles);
    }
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
      this.globalStyles = this.masterConfig.globalStyles;

      for (var key in this.masterConfig.styleVars) {
        var rx = new RegExp(key, 'g');
        this.globalStyles = this.globalStyles.replace(rx, this.masterConfig.styleVars[key]);
        console.log(rx);
      }
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
