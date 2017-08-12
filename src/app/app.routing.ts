import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

//authguard
import { AuthGuardService } from './authentication/services/auth-guard.service';

//Authentication components
import { LoginComponent } from './authentication/components/login/login.component';
import { CreateUserComponent } from './authentication/components/create-user/create-user.component';

//Blog Components
import { ListPostsComponent } from './blog/components/list-posts/list-posts.component';
import { CreatePostComponent } from './blog/components/create-post/create-post.component';
import { FullPostComponent } from './blog/components/full-post/full-post.component';
import { EditPostComponent } from './blog/components/edit-post/edit-post.component';

//Admin Components
import { AdminPanelComponent } from './admin/components/admin-panel/admin-panel.component';

//Pages Components
import { CustomPageComponent } from './pages/components/custom-page/custom-page.component';
import { EditPageComponent } from './pages/components/edit-page/edit-page.component';

const appRoutes: Routes = [
  {
    path: 'blog',
    component: ListPostsComponent
  },
  {
    path: 'blog/create',
    component: CreatePostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'blog/post/:id',
    component: FullPostComponent
  },
  {
    path: 'blog/edit/:id',
    component: EditPostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createuser',
    component: CreateUserComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'page/:title',
    component: CustomPageComponent
  },
  {
    path: 'page/edit/:id',
    component: EditPageComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
