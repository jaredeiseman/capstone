import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AdminNavComponent, AdminPanelComponent],
  exports: [AdminNavComponent]
})
export class AdminModule { }
