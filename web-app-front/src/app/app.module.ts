import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GuiGridModule } from '@generic-ui/ngx-grid';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { StudentComponent } from './components/registration/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard }   from './guards/role.guard';
import { StudentCabinetComponent } from './components/cabinet/student/student-cabinet/student-cabinet.component';
import { AdminComponent } from './components/cabinet/admin/admin.component';
import { SecretaryComponent } from './components/registration/secretary/secretary.component';
import { SecretaryCabinetComponent } from './components/cabinet/secretary/secretary-cabinet/secretary-cabinet.component';
import { LectorComponent } from './components/registration/lector/lector.component';
import { LectorCabinetComponent } from './components/cabinet/lector/lector-cabinet/lector-cabinet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DialogOverviewExampleDialog,
  HeadOfDepartmentComponent
} from './components/cabinet/head-of-department/head-of-department.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';

const appRoutes: Routes = [
  {path: '', component:MainComponent},
  {path: 'registration-student', component:StudentComponent},
  {path: 'registration-secretary', component:SecretaryComponent},
  {path: 'registration-lector', component:LectorComponent},
  {path: 'student', component:StudentCabinetComponent, canActivate: [RoleGuard]},
  {path: 'head-of-department', component:HeadOfDepartmentComponent, canActivate: [RoleGuard]},
  {path: 'secretary', component:SecretaryCabinetComponent, canActivate: [RoleGuard]},
  {path: 'lector', component:LectorCabinetComponent, canActivate: [RoleGuard]},
  {path: 'admin', component:AdminComponent, canActivate: [RoleGuard]},
  {path: 'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StudentComponent,
    LoginComponent,
    StudentCabinetComponent,
    AdminComponent,
    SecretaryComponent,
    SecretaryCabinetComponent,
    LectorComponent,
    LectorCabinetComponent,
    HeadOfDepartmentComponent,
    AddRoleComponent,
    RoleDetailsComponent,
    RolesListComponent,
    TableComponent,
    DialogOverviewExampleDialog
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        NgbModule,
        GuiGridModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule
    ],
  providers: [RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
