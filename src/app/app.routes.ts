import { Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth-guard.service';
import { NotFoundGuard } from '../shared/guards/not-found.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [NotFoundGuard],
  },
];
