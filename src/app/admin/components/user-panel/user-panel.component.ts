import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  users: any[];

  constructor(public svc: AdminService) { }

  ngOnInit() {
    this.svc.getUsers().subscribe(res => {
      this.users = res.json();
    })
  }

}
