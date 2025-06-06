import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('../../../pages/inicio/inicio.component') .then(m => m.InicioComponent),
      },
      {
        path: 'historial',
        loadComponent: () => import('../../../pages/historial/historial.component') .then(m => m.HistorialComponent),
      },
      {
        path: 'equipo',
        loadComponent: () => import('../../../pages/equipo/equipo.component') .then(m => m.EquipoComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('../../../pages/perfil/perfil.component') .then(m => m.PerfilComponent),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];

