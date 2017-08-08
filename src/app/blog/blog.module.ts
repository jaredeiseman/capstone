import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationModule } from '../authentication/authentication.module';

import { DatabaseService } from './services/database.service';

import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FullPostComponent } from './components/full-post/full-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AuthenticationModule,
    RouterModule
  ],
  declarations: [ListPostsComponent, CreatePostComponent, FullPostComponent, EditPostComponent],
  providers: [DatabaseService]
})
export class BlogModule { }
