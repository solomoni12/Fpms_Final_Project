import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './service/auth.interceptor';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SidebarComponent } from './user/sidebar/sidebar.component';
import { HomComponent } from './user/hom/hom.component';
import { TokenInterceptor } from './service/token.intrceptor';
// material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SettingComponent } from './user/dashboard/setting/setting.component';
import { FarmComponent } from './user/farm/farm.component';
import { WorkerComponent } from './user/worker/worker.component';
import { EquipmentComponent } from './user/equipment/equipment.component';
import { FarmAssigmentComponent } from './user/farm-assigment/farm-assigment.component';
import { FarmlistingComponent } from './user/farm/farmlisting/farmlisting.component';
import { UpdatefarmComponent } from './user/farm/updatefarm/updatefarm.component';
import { AddfarmComponent } from './user/farm/addfarm/addfarm.component';
import {MatInputModule} from '@angular/material/input';
import { WorkerlistingComponent } from './user/worker/workerlisting/workerlisting.component';
import { AddworkerComponent } from './user/worker/addworker/addworker.component';
import { UpdateworkerComponent } from './user/worker/updateworker/updateworker.component';
import { FarmAssigmentlistComponent } from './user/farm-assigment/farm-assigmentlist/farm-assigmentlist.component';
import { AssignTaskWorkerComponent } from './user/worker/assign-task-worker/assign-task-worker.component';
import { WorkerAssigmentComponent } from './user/worker-assigment/worker-assigment.component';
import { WorkerRefereeListComponent } from './user/workerReferee/worker-referee-list/worker-referee-list.component';
import { RefereesComponent } from './user/workerReferee/referees/referees.component';
import { AddRefereeComponent } from './user/workerReferee/add-referee/add-referee.component';
import { UpdateRefereeComponent } from './user/workerReferee/update-referee/update-referee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    HomComponent,
    SettingComponent,
    FarmComponent,
    WorkerComponent,
    EquipmentComponent,
    FarmAssigmentComponent,
    FarmlistingComponent,
    UpdatefarmComponent,
    AddfarmComponent,
    WorkerlistingComponent,
    AddworkerComponent,
    UpdateworkerComponent,
    FarmAssigmentlistComponent,
    AssignTaskWorkerComponent,
    WorkerAssigmentComponent,
    WorkerRefereeListComponent,
    RefereesComponent,
    AddRefereeComponent,
    UpdateRefereeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      // useClass: AuthInterceptor,
      useClass:TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
