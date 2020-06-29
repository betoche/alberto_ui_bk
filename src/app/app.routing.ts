import { Routes } from '@angular/router';
import { AdminLayoutComponent }
  from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent }
  from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard }
  from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('app/shared/modules/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'BROWSER_TITLE.SESSION', breadcrumb: 'SESSION' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'BROWSER_TITLE.DASHBOARD', breadcrumb: 'DASHBOARD' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
