import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PagesService } from './services/pages.service';
import { RouterModule } from '@angular/router';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule
  ],
  declarations: [CustomPageComponent, EditPageComponent],
  providers: [PagesService]
})
export class PagesModule { }
