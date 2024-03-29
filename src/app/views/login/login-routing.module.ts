import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { loginGuard } from 'src/app/core/auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}

