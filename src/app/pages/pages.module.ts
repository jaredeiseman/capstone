import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PagesService } from './services/pages.service';
import { RouterModule } from '@angular/router';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [CustomPageComponent, EditPageComponent],
  providers: [PagesService]
})
export class PagesModule { }
