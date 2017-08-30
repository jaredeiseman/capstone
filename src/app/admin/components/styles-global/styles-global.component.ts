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
  vars = null;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig().subscribe(res => {
      this.globalStyles = res.json()[0].globalStyles;
      this.vars = res.json()[0].styleVars;

      for (var key in this.vars) {
        var rx = new RegExp(this.vars[key], 'g');
        this.globalStyles = this.globalStyles.replace(rx, key);
      }
    });
  }

  ngAfterViewChecked() {
  }

  handleFormSubmit(form: NgForm) {
    var styles = form.value.globalStyles;
    var parsedStyles = '';

    for (var key in this.vars) {
      var rx = new RegExp(key, 'g');
      styles = styles.replace(rx, this.vars[key]);
    }

    this.configService.updateGlobalStyles({globalStyles: styles}).subscribe(res => {
      window.location.reload();
      console.log(res);
    });
  }
}
