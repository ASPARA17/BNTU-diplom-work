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
  HeadOfDepartmentComponent
} from './components/cabinet/head-of-department/head-of-department.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import {Dialog, RolesListComponent} from './components/role/roles-list/roles-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from "@angular/material/table";
import {DialogOverviewDialog} from "./components/role/dial/dialog-overview-dialog.component";
import {MatSelectModule} from "@angular/material/select";
import { EditGroupComponent } from './components/role/edit-group/edit-group.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpecialtyComponent } from './components/dialog/specialty/specialty.component';
import { GroupComponent } from './components/dialog/group/group.component';
import { LectorsComponent } from './components/dialog/lectors/lectors.component';
import { StudentsListComponent } from './components/dialog/students-list/students-list.component';
import { SecComponent } from './components/dialog/sec/sec.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { SecUserComponent } from './components/dialog/sec-user/sec-user.component';

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
    DialogOverviewDialog,
    Dialog,
    EditGroupComponent,
    SpecialtyComponent,
    GroupComponent,
    LectorsComponent,
    StudentsListComponent,
    SecComponent,
    SecUserComponent
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
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatGridListModule,
        MatTooltipModule,
        MatCardModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [RoleGuard,
    MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
