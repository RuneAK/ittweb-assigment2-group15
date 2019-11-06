import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterComponent} from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
