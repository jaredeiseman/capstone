import { Component, AfterViewChecked } from '@angular/core';
import { AuthService } from './authentication/services/auth.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'JaredEiseman.com';

  constructor(public auth: AuthService) {}

  ngAfterViewChecked() {

  }
}
