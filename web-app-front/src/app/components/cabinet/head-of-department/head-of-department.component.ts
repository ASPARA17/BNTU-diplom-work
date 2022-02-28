import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin/admin.service';
import {HeadOfDepartmentService} from '../../../services/headOfDepartment/head-of-department.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-head-of-department',
  templateUrl: './head-of-department.component.html',
  styleUrls: ['./head-of-department.component.scss'],
})
export class HeadOfDepartmentComponent implements OnInit {
  [x: string]: any;

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

  constructor(private admin: AdminService,
              private headOfDepartment: HeadOfDepartmentService,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    await this.getAllInfoLectors();
    await this.getInfoLStudents();
    await this.getAllUsersFromCathedra();
    await this.getAllSpecialtiesFromCathedra();
    await this.getGroupsFromCathedra();
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
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


  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }
}
