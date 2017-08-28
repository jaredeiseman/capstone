//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

//custom modules
import { BlogModule } from './blog/blog.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdminModule } from './admin/admin.module';
import { PagesModule } from './pages/pages.module';

import { routing } from './app.routing'

import { AppComponent } from './app.component';
import { NavbarPipe } from './pipes/navbar.pipe';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BlogModule,
    PagesModule,
    AuthenticationModule,
    AdminModule,
    RouterModule,
    routing
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
