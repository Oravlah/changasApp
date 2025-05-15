import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/components/tabs/tabs.routes').then( m => m.routes)
  },
  {
    path: 'layout',
    loadComponent: () => import('./shared/layout/layout/layout.component').then( m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio.component').then( m => m.InicioComponent)
      },
      {
        path: 'historial',
        loadComponent: () => import('./pages/historial/historial.component').then( m => m.HistorialComponent)
      },
      {
        path: 'equipo',
        loadComponent: () => import('./pages/equipo/equipo.component').then( m => m.EquipoComponent)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('../app/auth/pages/login/login.component').then( m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];
