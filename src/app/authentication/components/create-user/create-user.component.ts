import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  createUser(form: NgForm) {
    var newUser = new User(form.value.username, form.value.password, form.value.admin, form.value.firstName, form.value.lastName);
    this.auth.createUser(newUser).subscribe(res => {
      console.log(res);
    });
  }

}
