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
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
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
import { AddassigmentComponent } from './user/worker-assigment/addassigment/addassigment.component';
import { UpdateassigmentComponent } from './user/worker-assigment/updateassigment/updateassigment.component';
import { DeleteassigmentComponent } from './user/worker-assigment/deleteassigment/deleteassigment.component';
import { EquipmentlistComponent } from './user/equipment/equipmentlist/equipmentlist.component';
import { CropComponent } from './user/crop/crop.component';
import { FarmCropListComponent } from './user/crop/farm-crop-list/farm-crop-list.component';
import { AddCropComponent } from './user/crop/add-crop/add-crop.component';
import { UpdateCropComponent } from './user/crop/update-crop/update-crop.component';
import { CropListComponent } from './user/crop/crop-list/crop-list.component';
import { ProductComponent } from './user/product/product.component';
import { ProductListComponent } from './user/product/product-list/product-list.component';
import { AddProductComponent } from './user/product/add-product/add-product.component';
import { UpdateProductComponent } from './user/product/update-product/update-product.component';
import { UpdateEquipmentComponent } from './user/equipment/update-equipment/update-equipment.component';
import { AddEquipmentComponent } from './user/equipment/add-equipment/add-equipment.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

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
    AddassigmentComponent,
    UpdateassigmentComponent,
    DeleteassigmentComponent,
    EquipmentlistComponent,
    CropComponent,
    FarmCropListComponent,
    AddCropComponent,
    UpdateCropComponent,
    CropListComponent,
    ProductComponent,
    ProductListComponent,
    AddProductComponent,
    UpdateProductComponent,
    UpdateEquipmentComponent,
    AddEquipmentComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
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
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
