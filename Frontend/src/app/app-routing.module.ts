import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { HomComponent } from './user/hom/hom.component';
import { SettingComponent } from './user/dashboard/setting/setting.component';
import { FarmComponent } from './user/farm/farm.component';
import { WorkerComponent } from './user/worker/worker.component';
import { EquipmentComponent } from './user/equipment/equipment.component';
import { FarmAssigmentComponent } from './user/farm-assigment/farm-assigment.component';

const routes: Routes = [
  {
    path: '', component:HomComponent,canActivate: [AuthGuard],
    children:[
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
      { path: 'user', component: UserlistingComponent, canActivate: [AuthGuard]},
      {path: 'setting', component:SettingComponent,canActivate: [AuthGuard]},
      {path: 'farm', component:FarmComponent,canActivate: [AuthGuard]},
      {path: 'assigment', component:FarmAssigmentComponent,canActivate: [AuthGuard]},
      {path: 'worker', component:WorkerComponent,canActivate: [AuthGuard]},
      {path: 'equipment', component:EquipmentComponent,canActivate: [AuthGuard]},
    ]
  },
    { path:'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
    
  /*
  { path:'', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomComponent,
    children:[
      {path: 'dashboard', component: DashboardComponent},
      {path: 'setting', component:SettingComponent}
    ], canActivate: [AuthGuard]
  },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path:'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserlistingComponent, canActivate: [AuthGuard]},
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
