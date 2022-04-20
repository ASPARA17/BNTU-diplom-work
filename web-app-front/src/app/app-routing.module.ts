import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import {HeadOfDepartmentComponent} from "./components/cabinet/head-of-department/head-of-department.component";

const routes: Routes = [
  // { path: '', redirectTo: 'roles', pathMatch: 'full' },
   { path: 'roles', component: RolesListComponent },
  // { path: 'roles/:id', component: RoleDetailsComponent },
  // { path: 'add', component: AddRoleComponent }
  { path: 'head_of_department', component: HeadOfDepartmentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
