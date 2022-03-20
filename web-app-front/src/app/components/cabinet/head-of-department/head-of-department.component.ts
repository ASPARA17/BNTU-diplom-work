import {Component, Inject, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';
import {HeadOfDepartmentService} from '../../../services/headOfDepartment/head-of-department.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Specialty1Model } from '../../../models/specialty1.model';
import {Group} from "../../../models/group.model";
import {RestService} from "../../../services/rest.service";
import {UserService} from "../../../services/user/user.service";
import {DiplomWorkService} from "../../../services/diplomWork/diplom-work.service";
import {GuiColumn, GuiColumnMenu, GuiSearching, GuiSorting} from "@generic-ui/ngx-grid";


export interface DialogData {
  animal: string;
  name: string;
}

declare function initTab(): void;
@Component({
  selector: 'app-head-of-department',
  templateUrl: './head-of-department.component.html',
  styleUrls: ['./head-of-department.component.scss'],
})
export class HeadOfDepartmentComponent implements OnInit {
  value = 'Clear me';

  [x: string]: any;

  users: any;
  user = {
    user_login: '',
    user_password: '',
    user_first_name: '',
    user_second_name: '',
    user_middle_name: '',
    user_confirm: false,
  };
  submitted = false;

  userName = JSON.parse(localStorage.getItem('user'));
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  active = 1;
  listOfUsers;
  usersList;
  studentsList;
  // roles = [{ id: 'student', name: 'Студент' }, {id: 'secretary', name:'Секретарь'},{id: 'lector',
  // name:'Преподаватель из университета'}, {id: 'head-of-department', name:'Заведующий кафедры'}];
  roles = [{ id: '1', name: 'Студент' }, {id: '3', name: 'Секретарь'}, {id: '4', name: 'Преподаватель'},
    {id: '5', name: 'Заведующий кафедры'}];
  vacancies = [1, 2, 3, 4, 5, 6, 7, 8];
  lectorsList;
  specialtiesList;
  groupsList;

  //example
  groups: Group[] = [];

  animal: string;
  name: string;

  allDiplomWorksList;
  sec: any = [];


  columnsUsers: Array<GuiColumn> = [{
    header: 'Фамилия',
    field: 'user_second_name'
  }, {
    header: 'Имя',
    field: 'user_first_name'
  }, {
    header: 'Отчество',
    field: 'user_middle_name'
  }, {
    header: 'Роли'
  }, {
    header: 'Действия'
  }];

  searching: GuiSearching = {
    enabled: true,
    placeholder: 'Search users'
  };

  columnMenu: GuiColumnMenu = {
    enabled: true,
    sort: true,
    columnsManager: true
  };

  sorting: GuiSorting = {
    enabled: true,
    multiSorting: true
  };




  constructor(private admin: AdminService,
              private headOfDepartment: HeadOfDepartmentService,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private restService: RestService,
              private userService: UserService,
              private diplomWork: DiplomWorkService,
              public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getAllInfoLectors();
    await this.getInfoLStudents();
    await this.getAllUsersFromCathedra();
    await this.getAllSpecialtiesFromCathedra();
    await this.getGroupsFromCathedra();
    this.getAllDiplomWorks();
    this.retrieveUsers();

    //example
    // this.restService.getGroups().subscribe((response) => {
    //   this.groups=response;
    // })

    this.groups = await this.restService.getGroups();


  }

  onCreate() {
    //this.dialog.open();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  async retrieveUsers() {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  async getSec(){
    this.sec = await this.secretary.getSec()
  }

  async getAllDiplomWorks() {
    console.log("all diplom work")
    this.allDiplomWorksList = await this.diplomWork.getAllDiplomWorks()
  }

  async delete(id): Promise<void> {
    await this.admin.deleteUser(id);
    this.listOfUsers =  await this.admin.getAllUsers();
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1);
  }

  async confirm(id): Promise<void> {
    await this.admin.confirmUser(id);  // ожидание подтверждения админом пользователя
    await this.getAllUsersFromCathedra();
  }

  async updateRole(id,role){
    await this.admin.updateUserRole(id,role)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }


  async getAllInfoLectors() {
    this.lectorsList = await this.headOfDepartment.getInfoLectors(this.userInfo.cathedra_id)
    this.lectorsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
  }

  async getInfoLStudents() {
    this.studentsList = await this.headOfDepartment.getInfoStudentsByCathedra(this.userInfo.cathedra_id)
    this.studentsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
    console.log(this.studentsList)
  }

  async getAllUsersFromCathedra() {
    this.usersList = await this.headOfDepartment.getUsersByCathedra(this.userInfo.cathedra_id)
    this.usersList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
  }

  async getAllSpecialtiesFromCathedra() {
    this.specialtiesList = await this.headOfDepartment.getSpecialtiesByCathedra(this.userInfo.cathedra_id)
  }

  async getGroupsFromCathedra() {
    this.groupsList = await this.headOfDepartment.getGroupsByCathedra(this.userInfo.cathedra_id)
  }

  async deleteSpecialty(specialtyId) {
    await this.headOfDepartment.deleteSpecialty(specialtyId)
    await this.getAllSpecialtiesFromCathedra();
  }

  async addSpecialty(name, fullName, number){
    await this.headOfDepartment.addSpecialty(this.userInfo.cathedra_id, name, fullName, number);
    await this.getAllSpecialtiesFromCathedra()
  }

  async editSpecialty(specialtyId, name, fullName, number){
    await this.headOfDepartment.editSpecialty(specialtyId, name, fullName, number);
    await this.getAllSpecialtiesFromCathedra()
  }

  async filterStudentsByGroupId(groupId) {
    this.studentsList = await this.headOfDepartment.getStudentsByGroupId(this.userInfo.cathedra_id, groupId)
    this.studentsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
    console.log(this.studentsList)
  }

  async addGroup(groupName, specialtyId) {
    await this.headOfDepartment.addGroup(groupName, specialtyId);
    await this.getGroupsFromCathedra();
  }

  async deleteGroup(groupId): Promise<void> {
    await this.headOfDepartment.deleteGroup(groupId);
    await this.getGroupsFromCathedra();
  }

  openEdit(content, specialty: Specialty1Model) {
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('fullName').setAttribute('value', specialty.getFullName());
    document.getElementById('name').setAttribute('value', specialty.getName());
    document.getElementById('number').setAttribute('value', specialty.getSpecialtyNumber());

  }

  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
