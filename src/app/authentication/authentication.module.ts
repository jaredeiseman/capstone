import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [LoginComponent, CreateUserComponent],
  providers: [AuthService, AuthGuardService]
})
export class AuthenticationModule { }
