import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-styles-vars',
  templateUrl: './styles-vars.component.html',
  styleUrls: ['./styles-vars.component.scss']
})
export class StylesVarsComponent implements OnInit {
  vars: any = null;
  inputs: any = [['', '']];
  masterConfig = null;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig().subscribe(res => {
      this.masterConfig = res.json()[0];
      this.vars = res.json()[0].styleVars ? res.json()[0].styleVars : {};
      if (this.inputs.length > 0) {
        this.inputs = Object.keys(this.vars).map((key) => {
          var arr = [key, this.vars[key]];
          return arr;
        });
      }
      else {
        this.inputs = [["", ""]];
      }
    });
  }

  updateVariables(form: NgForm) {
    var vars = form.value;
    var styleVars = {};

    for (var i = 0; i < Object.keys(vars).length / 2; i++) {
      styleVars[`${vars['key' + i]}`] = vars['val' + i];
    }

    var newConfig = this.masterConfig;
    newConfig.styleVars = styleVars;
    this.configService.updateConfig(newConfig).subscribe(res => {
      console.log(res);
      window.location.reload();
    });
  }

  addInput() {
    this.inputs.push(["",""]);
  }

  removeInput(i) {
    this.inputs.splice(i, 1);
  }

}
