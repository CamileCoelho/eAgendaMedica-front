import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AtividadesComponent } from './views/atividades/atividades.component';

const routes: Routes = [  
  // { 
  //   path: '', 
  //   redirectTo: 'conta/autenticar', 
  //   pathMatch: 'full' 
  // },
  // { 
  //   path: 'conta/autenticar', 
  //   component: LoginComponent, 
  //   canActivate: [LoginGuard] 
  // },
  // { 
  //   path: 'conta/registrar', 
  //   component: RegistroComponent, 
  //   canActivate: [LoginGuard] 
  // },
  // { 
  //   path: 'dashboard', 
  //   component: DashboardComponent, 
  //   canActivate: [authGuard] 
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'atividades',
    component: AtividadesComponent,
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./views/medicos/medico.module').then((m) => m.MedicoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
