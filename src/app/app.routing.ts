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
import { AboutComponent } from './pages/components/about/about.component';
import { WorkComponent } from './pages/components/work/work.component';
import { ContactComponent } from './pages/components/contact/contact.component';
import { CustomPageComponent } from './pages/components/custom-page/custom-page.component';

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
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'work',
    component: WorkComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'page/:title',
    component: CustomPageComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
