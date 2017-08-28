import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-master-config',
  templateUrl: './master-config.component.html',
  styleUrls: ['./master-config.component.scss']
})
export class MasterConfigComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }

  handleForm(form: NgForm) {
    this.configService.updateConfig(form.value).subscribe((res) => {
      window.location.reload();
    });
  }

}
