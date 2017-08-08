import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../../authentication/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  users: any[];
  editing: boolean = false;
  userBeingEdited: any = null;

  constructor(public svc: AdminService) { }

  ngOnInit() {
    this.svc.getUsers().subscribe(res => {
      this.users = res.json();
    })
  }

  edit(user) {
    this.userBeingEdited = user;
    this.editing = true;
  }

  finishedEditing(form: NgForm) {
    form.value.isAdmin = (form.value.isAdmin === 'true');
    if (form.value.password === '') {
      delete form.value.password;
    }
    this.svc.updateUser(form.value).subscribe(res => {
      if (res.status === 200) {
        this.editing = false;
        this.userBeingEdited = null;
      } else {
        console.log('problems');
      }
    });
  }

  delete(user) {
    if (confirm('Are you sure?')) {
      this.svc.deleteUser(user).subscribe(res => {
        console.log(res);
      });
    }
  }

}
