import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AdminService } from './services/admin.service';

import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { PostPanelComponent } from './components/post-panel/post-panel.component';
import { PagePanelComponent } from './components/page-panel/page-panel.component';
import { CreatePageFormComponent } from './components/create-page-form/create-page-form.component';
import { MasterConfigComponent } from './components/master-config/master-config.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule
  ],
  declarations: [AdminNavComponent, AdminPanelComponent, UserPanelComponent, PostPanelComponent, PagePanelComponent, CreatePageFormComponent, MasterConfigComponent],
  exports: [AdminNavComponent],
  providers: [AdminService]
})
export class AdminModule { }
