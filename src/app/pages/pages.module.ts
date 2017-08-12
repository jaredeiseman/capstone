import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { WorkComponent } from './components/work/work.component';
import { ContactComponent } from './components/contact/contact.component';
import { HttpModule } from '@angular/http';
import { PagesService } from './services/pages.service';
import { RouterModule } from '@angular/router';
import { CustomPageComponent } from './components/custom-page/custom-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [AboutComponent, WorkComponent, ContactComponent, CustomPageComponent],
  providers: [PagesService]
})
export class PagesModule { }
