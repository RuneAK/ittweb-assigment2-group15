import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegisterComponent} from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ShowallComponent } from './components/workout/showall/showall.component';
import { CreateComponent } from './components/workout/create/create.component';
import { ShowComponent } from './components/workout/show/show.component';
import { AddExerciseComponent } from './components/workout/add-exercise/add-exercise.component';
import { ActivityComponent } from './components/workout/activity/activity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'showall' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'showall', component: ShowallComponent},
  {path: 'create', component: CreateComponent},
  {path: 'show', component: ShowComponent},
  {path: 'addExercise', component: AddExerciseComponent},
  {path: 'activity', component: ActivityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
