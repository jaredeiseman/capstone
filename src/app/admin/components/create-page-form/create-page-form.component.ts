import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-page-form',
  templateUrl: './create-page-form.component.html',
  styleUrls: ['./create-page-form.component.scss']
})
export class CreatePageFormComponent implements OnInit {

  constructor(private svc: AdminService, private router: Router) { }

  ngOnInit() {
  }

  createPage(form: NgForm) {
    form.value.displayInNav = (form.value.displayInNav === "true");
    this.svc.createPage(form.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/page', form.value.route]);
    });
  }

}
