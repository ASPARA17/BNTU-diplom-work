import {Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';
import {HeadOfDepartmentService} from '../../../services/headOfDepartment/head-of-department.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

import { Specialty1Model } from '../../../models/specialty1.model';
import {Group} from "../../../models/group.model";
import {RestService} from "../../../services/rest.service";
import {UserService} from "../../../services/user/user.service";
import {DiplomWorkService} from "../../../services/diplomWork/diplom-work.service";
import {
  GuiCellEdit,
  GuiColumn, GuiColumnCellEditing,
  GuiColumnMenu,
  GuiLocalization,
  GuiPaging,
  GuiPagingDisplay,
  GuiSearching,
  GuiSorting,
} from "@generic-ui/ngx-grid";
import {GroupService} from "../../../services/group/group.service";
import {MatTableDataSource} from "@angular/material/table";
import {SpecialtyService} from "../../../services/specialty/specialty.service";
import {EditGroupComponent} from "../../role/edit-group/edit-group.component";
import {SpecialtyComponent} from "../../dialog/specialty/specialty.component";


export interface DialogData {
  animal: string;
  name: string;
}

const GROUP_INFO = [
  {"specialty": {
    "specialty_name": "jdiwj"
    }, "group_name": "45588"},
  {"specialty": {
      "specialty_name": "ijinnin"
    }, "group_name": "788787"},
];

const GROUP_SCHEMA = {
  "specialty.specialty_name": "text",
  "group_name": "text",
  "isEdit": "isEdit"
}

@Component({
  selector: 'app-head-of-department',
  templateUrl: './head-of-department.component.html',
  styleUrls: ['./head-of-department.component.scss'],
})
export class HeadOfDepartmentComponent implements OnInit {
  specialtyColumns: string[] = ['specialtyFullName', 'specialtyName', 'code','action'];
  specialties: any;


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
  groupsList: Group[] = [];

  //example
  groups: Group[] = [];

  animal: string;
  name: string;

  allDiplomWorksList;
  sec: any = [];


  currentCathedraId:number = this.userInfo.cathedra_id;

  constructor(private admin: AdminService,
              private headOfDepartment: HeadOfDepartmentService,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private restService: RestService,
              private userService: UserService,
              private diplomWork: DiplomWorkService,
              public dialog: MatDialog,
              private groupService: GroupService,
              private specialtyService: SpecialtyService) { }

  async ngOnInit(): Promise<void> {
    await this.getAllInfoLectors();
    await this.getInfoLStudents();
    await this.getAllUsersFromCathedra();
    await this.getAllSpecialtiesFromCathedra();
    //await this.getGroupsFromCathedra();
    await this.getNewGroups();
    await this.getAllDiplomWorks();
    //await this.retrieveUsers();

    //example
    // this.restService.getGroups().subscribe((response) => {
    //   this.groups=response;
    // })

    //this.groups = await this.restService.getGroups();
    //let dataSource = this.groupsList;

    this.specialtyTableData();
  }

  specialtyTableData() {
    this.specialtyService.getAllByCathedraId(this.currentCathedraId).
      subscribe((response: any) => {
      this.specialties = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  handleEditAction(values:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = "750px";
    const dialogRef = this.dialog.open(SpecialtyComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditSpecialty.subscribe((response)=> {
      this.specialtyTableData();
    })
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "750px";
    const dialogRef = this.dialog.open(SpecialtyComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditSpecialty.subscribe((response)=> {
      this.specialtyTableData();
    })
  }

  handleDeleteAction(values:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'delete ' + values.specialty_name
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteSpecialty(values.specialty_id);
      dialogRef.close()
    })
  }




  onCreate() {
    //this.dialog.open();
  }

  loadTemplate(group) {
    if (this.groupUser && this.groupUser.group_id === group.group_id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
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

  async getNewGroups() {
    // this.groupsList = await this.groupService.getAllByCathedraId(this.userInfo.cathedra_id)
    // console.log(this.groupsList)
    this.groupService.getAllByCathedraId(this.userInfo.cathedra_id)
      .subscribe(
        data => {
          this.groupsList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateGroup(): void {
    const data = {
      group_name: 'myTest',
      fk_specialty: 3
    };
    this.groupService.update(data)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The group was updated successfully!';
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
    //this.groupsList = await this.headOfDepartment.getGroupsByCathedra(this.userInfo.cathedra_id)
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

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {
//
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//
// }
