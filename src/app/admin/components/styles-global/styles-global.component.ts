import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../../../services/config.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-styles-global',
  templateUrl: './styles-global.component.html',
  styleUrls: ['./styles-global.component.scss']
})
export class StylesGlobalComponent implements OnInit, AfterViewChecked {

  textareaPopulated: boolean = false;
  globalStyles: string = null;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig().subscribe(res => {
      this.globalStyles = res.json()[0].globalStyles;
    });
  }

  ngAfterViewChecked() {
  }

  handleFormSubmit(form: NgForm) {
    this.configService.updateGlobalStyles(form.value).subscribe(res => {
      window.location.reload();
    });
  }
}
