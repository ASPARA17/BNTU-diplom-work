import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../../app/services/admin/admin.service';
import {NgbDate, NgbCalendar, NgbDateParserFormatter,NgbModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { StudyInfoService } from 'src/app/services/study/study-info.service';
import { STUDY } from 'src/app/constants/globals';
import {UserService} from "../../../services/user/user.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user = {
    user_login: '',
    user_password: '',
    user_first_name: '',
    user_second_name: '',
    user_middle_name: '',
    user_confirm: false,
  };
  submitted = false;
  users: any;


  hoveredDate: NgbDate | null = null;
  userName = JSON.parse(localStorage.getItem('user'));
  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  dates: any;
  faculties;        // все факультеты
  cathedraAll;
  specialties;
  universities;
  listOfUsers;
  selectedAttributes;
  isEditOpen: any = true;
  universityId: any = '';
  universityData: any = {};
  facultyAtUniversity: any = [];
  roles = [{ id: 'student', name: 'Студент' }, {id: 'secretary', name:'Секретарь'},
            {id: 'lector', name:'Преподаватель из университета'}, {id: 'head-of-department', name:'Заведующий кафедры'}];
  yearStart: NgbDateStruct;
  yearEnd: NgbDateStruct;
  universityChoose: any;

  constructor(private admin: AdminService,
          private calendar: NgbCalendar,
          public formatter: NgbDateParserFormatter,
          private modalService: NgbModal,
          private authService: AuthService,
          private router: Router,
          private userService: UserService,
          private studyInfo: StudyInfoService) {
            this.fromDate = calendar.getToday();
            this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  async ngOnInit() {
    // this.listOfUsers =  await this.admin.getAllUsers()
    // this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
    this.listOfUsers =
    await this.getAllDate();
    await this.getAllFaculty();
    await this.getAllUniversity();
    this.retrieveUsers();
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

  async delete(id) {
    await this.admin.deleteUser(id)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

  async confirm(id){
    await this.admin.confirmUser(id)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

  async updateRole(id,role){
    await this.admin.updateUserRole(id,role)
    this.listOfUsers =  await this.admin.getAllUsers()
    this.listOfUsers.sort((a, b) => (a.user_first_name > b.user_first_name) ? 1 : -1)
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  async submitDate(){
    await this.admin.postDate(Object.values(this.fromDate).join('-'),Object.values(this.toDate).join('-'));
    await this.getAllDate()
  }

  async getAllDate(){
    this.dates = await this.admin.getDate()
  }

  async deleteDate(id){
    await this.admin.deleteDate(id)
    await this.getAllDate()
  }

  async getAllFaculty() {
    this.faculties = await this.admin.getFaculty()
  }

  async getAllUniversity() {
    this.universities = await this.admin.getUniversity()
  }

  async deleteUniversity(id){
    await this.admin.deleteUniversity(id)
    await this.getAllUniversity()
  }

  async addUniversity(name, fullName){
    await this.admin.addUniversity(name, fullName);
    await this.getAllUniversity()
  }

  async openEditUniversity(id){
    this.isEditOpen = !this.isEditOpen;
    this.universityId = id;
    this.universityData = await this.admin.getUniversityById(id)
  }

  async getFacultyAt(){
    this.facultyAtUniversity = await this.admin.getFacultyAtUniversity(this.universityId);
    //this.getCathedra()
  }

  async getFacultyByUniversity(universityId){
    this.facultyAtUniversity = await this.admin.getFacultyAtUniversity(universityId);
    //this.getCathedra()
  }


  async addFaculty(name, fullName){
    await this.admin.addFaculty(name, fullName, this.universityId);
    await this.getFacultyAt()
  }

  async deleteFaculty(id){
    await this.admin.deleteFaculty(id)
    await this.getFacultyAt()
  }

  async getCathedra(facultyId){
    this.cathedraAll = await this.admin.getCathedra(facultyId);
  }

  async deleteCathedra(id, facultyId){
    await this.admin.deleteCathedra(id)
    await this.getCathedra(facultyId)
  }

  async getSpecialty(cathedraId){
    this.specialties = await this.admin.getSpecialty(cathedraId);
  }

  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }




}
