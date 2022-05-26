import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import {SecretaryService} from '../../../../services/secretary/secretary.service';
import {NgbDate,NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {RoleService} from "../../../../services/role.service";
import {MatTableDataSource} from "@angular/material/table";
import {SecService} from "../../../../services/sec-structure/sec/sec.service";
import {SnackbarService} from "../../../../services/snackbar/snackbar.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {SecUserService} from "../../../../services/sec-structure/sec-user/sec-user.service";
import {DepartmentService} from "../../../../services/university-structure/department/department.service";
import {SecSpecialtyService} from "../../../../services/sec-structure/sec-specialty/sec-specialty.service";
import {SecGroupService} from "../../../../services/sec-structure/sec-group/sec-group.service";
import {StudentService} from "../../../../services/student/student.service";

@Component({
  selector: 'app-secretary-cabinet',
  templateUrl: './secretary-cabinet.component.html',
  styleUrls: ['./secretary-cabinet.component.scss']
})
export class SecretaryCabinetComponent implements OnInit {
  secColumns: string[] = ['secNumber', 'dateStart', 'dateEnd', 'action'];
  sec: any;
  responseMessage:any;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));

  secUsersColumn: string[] = ['lastName', 'firstName', 'middleName', 'role', 'action'];
  secUsers: any;

  isEditSecOpen: any = true;
  editedSecId: any;
  secData: any = {};

  secCathedraColumn: string[] = ['cathedra', 'faculty', 'action'];
  secCathedra: any = [];

  secSpecialtyColumn: string[] = ['specialty', 'specialtyFullName', 'code', 'action'];
  secSpecialties: any = [];

  secGroupColumn: string[] = ['groupName', 'specialty', 'action'];
  secGroups: any = [];

  secStudentColumn: string[] = ['studentName', 'groupName', 'action'];
  secStudents: any = [];

  stud:any;

  userName = JSON.parse(localStorage.getItem('user'));
  active = 1;
  //sec: any = [];
  years: any = [];
  selectedGroup:any = {};
  selectedYear: any = [];

  secretaryData: any = {};
  specialtyData: any = {};
  groupData: any = {};
  hoveredDate: NgbDate | null = null;
  cathedra: any = [];

  specialty: any = [];
  secSpecialty: any = [];
  percent: any = [];
  secPercent: any = [];
  group: any = [];
  secGroup: any = [];
  event: any = [];
  secEvent: any = [];
  selectedSecRoles: any = [];
  //secUsers: any = [];
  user: any = [];
  secRoles: any = [];
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  secId: any = '';

  timeStart = {hour: 13, minute: 30};
  timeEnd = {hour: 13, minute: 30};
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  constructor(private modalService: NgbModal,
              private calendar: NgbCalendar,
              private secretary: SecretaryService,
              private docService:RoleService,
              private secService:SecService,
              private snackbarService:SnackbarService,
              private authService: AuthService,
              private router: Router,
              private secUserService:SecUserService,
              private departmentService:DepartmentService,
              private secSpecialtyService:SecSpecialtyService,
              private secGroupService:SecGroupService,
              private studentService:StudentService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    //this.getSec()
    this.getCathedra()
    this.getYears();
    this.getSecRoles()

    this.secTableData();
  }

  putCathedra(id) {
    this.secService.updateCathedraId(id, this.editedSecId).
    subscribe((response: any) => {
      for(let spec of this.secSpecialties){
        this.deleteSecSpecialty(spec.specialty_id)
      }
      this.secCathedraTableData();

    }, (error: any)=>{
      console.log(error);
    });
  }

  secStudentTableData() {
    this.studentService.getAllBySecId(this.editedSecId).
    subscribe((response: any) => {
      this.secStudents = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  secGroupTableData() {
    this.secGroupService.getAllBySecId(this.editedSecId).
    subscribe((response: any) => {
      this.secGroups = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  secSpecialtyTableData() {
    this.secSpecialtyService.getAllBySecId(this.editedSecId).
    subscribe((response: any) => {
      this.secSpecialties = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  secCathedraTableData() {
    this.departmentService.getAllBySecId(this.editedSecId).
    subscribe((response: any) => {
      this.secCathedra = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  deleteSecUser(id) {
    this.secUserService.delete(id).
    subscribe((response: any) => {
      this.secUsersTableData();
    }, (error: any)=>{
      console.log(error);
    });
  }

  secUsersTableData() {
    this.secUserService.getAllBySecId(this.editedSecId).
    subscribe((response: any) => {
      this.secUsers = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  async openEditSec(id){
    this.isEditSecOpen = !this.isEditSecOpen;
    this.editedSecId = id;
    this.getSecById(id)
    console.log(this.secData)
  }

  getSecById(id:any) {
    this.secService.getById(id).
    subscribe((response: any) => {
      this.secData = response
      console.log(this.secData)
    }, (error: any)=>{
      console.log(error);
    });
  }

  secTableData() {
    this.secService.getAllByUserId(this.userInfo.user_id).
    subscribe((response: any) => {
      this.sec = new MatTableDataSource(response);
      console.log(this.sec)
    }, (error: any)=>{
      console.log(error);
    });
  }

  // deleteSec(id:any) {
  //   this.secService.delete(id).subscribe((response:any)=>{
  //     //this.secTableData();
  //     console.log(response)
  //     this.responseMessage = response?.message;
  //     this.snackbarService.openSnackBar(this.responseMessage, "success");
  //   }, (error:any)=>{
  //     console.log(error);
  //     if (error.error?.message) {
  //       this.responseMessage = error.error?.message;
  //     }
  //     else {
  //       this.responseMessage = "BIG ERROR";
  //     }
  //     this.snackbarService.openSnackBar(this.responseMessage, "error")
  //   })
  // }

  deleteSec(id:any) {
    this.secService.delete(id).
    subscribe((response: any) => {
      this.secTableData();
    }, (error: any)=>{
      console.log(error);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  openLg(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  selectToday() {
    this.model = this.calendar.getToday();
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

  async getYears(){
    this.years = await this.secretary.getYears()
  }
/*
  async addSec(number,text){
    if(text){
      number += `-${text}`;
    }
    await this.secretary.postSec(number,Object.values(this.fromDate).join('-'),Object.values(this.toDate).join('-'),this.selectedYear.year_id)
    this.selectedYear = ''
    await this.getSec()
  }*/
/*
  async getSec(){
    this.sec = await this.secretary.getSec()
  }*/
/*
  async deleteSec(id){
    await this.secretary.deleteSec(id)
    await this.getSec()
  }*/

  // async openEditSec(id){
  //   this.isEditOpen = !this.isEditOpen;
  //   this.secId = id;
  //   this.secretaryData = await this.secService.getById(id)
  // }

  async getCathedra(){
    this.cathedra = await this.secretary.getCathedra();
  }


  // async putCathedra(id){
  //   await this.secretary.putSecCathedra(id, this.editedSecId);
  //   for(let spec of this.secSpecialties){
  //     this.deleteSecSpecialty(spec.specialty_id)
  //   }
  //   this.getSecCathedra()
  // }

  async getSecCathedra(){
    this.secCathedra = await this.secretary.getSecCathedra(this.editedSecId);
    this.getSpecialty()
  }

  async getStud() {
    this.stud = await this.secretary.getStud();
  }

  async deleteSecCathedra(){
    await this.secretary.deleteSecCathedra(this.editedSecId);
    this.secCathedra = null;
    for(let spec of this.secSpecialty){
      this.deleteSecSpecialty(spec.specialty_id)
    }
    this.getSecCathedra();
  }

  async getSpecialty(){
    if(this.secCathedra?.cathedra_id){
    this.specialty = await this.secretary.getSpecialty(this.secCathedra.cathedra_id);
    }
  }

  async putSpecialty(id){
    await this.secretary.putSecSpecialty(id, this.editedSecId);
    this.getSecSpecialty()
  }

  async getSecSpecialty(){
    this.secSpecialty = await this.secretary.getSecSpecialty(this.editedSecId);
    this.secSpecialty = await this.secretary.getSecSpecialty(this.editedSecId);
    this.group = [];
    for await (let spec of this.secSpecialty){
      this.getGroup(spec.specialty_id)
    }

  }

  // async deleteSecSpecialty(specId){
  //   await this.secretary.deleteSecSpecialty(this.editedSecId,specId);  // удалять группы из sec_group и удалять юзеров из student_marks
  //   for await(let group of this.secGroups){
  //     if(group.fk_specialty == specId){
  //       console.log('Delete Group by Id',group.group_id)
  //       this.deleteSecGroup(group.group_id)
  //     }
  //   }
  //   this.getSecSpecialty()
  // }

  deleteSecSpecialty(id) {
    this.secSpecialtyService.delete(this.editedSecId, id).
    subscribe((response: any) => {
      for (let group of this.secGroups) {
        if (group.fk_specialty == id) {
          console.log('Delete Group by Id',group.group_id)
          this.deleteSecGroup(group.group_id)
        }
      }
      this.secSpecialtyTableData();
    }, (error: any)=>{
      console.log(error);
    });
  }



  async getGroup(specId){
    const result = await this.secretary.getGroup(specId);
    this.group.push(result)
    this.group = this.group.flat()
  }


  async putGroup(id){
    console.log(id)
    await this.secretary.putSecGroup(id, this.editedSecId);
    this.getSecGroup()
  }

  async getSecGroup(){
    this.secGroup = await this.secretary.getSecGroup(this.editedSecId);
  }

  async deleteSecGroup(groupId){
    await this.secretary.deleteSecGroup(this.editedSecId,groupId);  ///// отредактировать удаление
    this.getSecGroup()
  }

  async addPercent(name,percentPlane,comment){
    console.log(this.selectedStudents)
    await this.secretary.putSecPercent(name,percentPlane,comment, Object.values(this.model).join('-'),
      Object.values(this.toDate).join('-'), this.editedSecId, this.secGroup.group_id,this.selectedStudents);
    await this.getSecPercent()
  }

  async getSecPercent(){
    this.secPercent = await this.secretary.getSecPercent(this.editedSecId);
    this.secPercent.sort((a,b) => a.name - b.name)
    console.log('Percent',this.secPercent)
  }

  async deletePercent(id){
    await this.secretary.deleteSecPercent(id);
    await this.getSecPercent()
  }

  editPercent(id){
    this.percent = this.secPercent.find(element => element.id_percentage === id)
  }

  async savePercent(name,percentPlane,comment){
    console.log(name,percentPlane,comment)
    await this.secretary.saveSecPercent(name,percentPlane,comment, Object.values(this.model).join('-'),Object.values(this.toDate).join('-'), this.percent.id_percentage,this.selectedStudents);
    await this.getSecPercent()
  }

  async addEvent(address, address1, address2){
    address += `, Корпус - ${address1}, Факультет - ${address2} `
    console.log(address,this.selectedGroup,this.model,this.timeStart,this.timeEnd)
    console.log('Start',this.timeStart, this.timeEnd)
    const startTime = `${this.timeStart.hour}:${this.timeStart.minute}`;
    const endTime = `${this.timeEnd.hour}:${this.timeEnd.minute}`
    await this.secretary.putSecEvent(address,this.selectedGroup.group_name, Object.values(this.model).join('-'),`${startTime} / ${endTime}`,
      this.editedSecId, this.selectedStudents);
    await this.getSecEvent()
  }

  async getSecEvent(){
    this.secEvent = await this.secretary.getSecEvent(this.editedSecId);
    this.secEvent.sort((a,b) => a.id_sec_event - b.id_sec_event )
    console.log('Event',this.secEvent)
  }

  async deleteEvent(id){
    await this.secretary.deleteSecEvent(id);
    await this.getSecEvent()
  }

  editEvent(id){
    console.log(this.secEvent)
    this.event = {...this.secEvent.find(element => element.id_sec_event === id)}
    const address =  this.event.address.split(',')
    this.event.address = address[0];
    this.event.corpus = address[1].slice(10);
    this.event.faculty = address[2].slice(13);
  }

  async saveEvent(address, address1, address2){
    console.log(this.event)
    address += `, Корпус - ${address1}, Факультет - ${address2} `
    await this.secretary.editSecEvent(address,this.selectedGroup.group_name, Object.values(this.model).join('-'),`${Object.values(this.timeStart).join('-')} / ${Object.values(this.timeEnd).join('-')}`, this.event.id_sec_event, this.selectedStudents);
    await this.getSecEvent()
  }

  async getSecRoles(){
    this.secRoles = await this.secretary.getSecRoles();
    console.log('Event',this.secRoles)
  }

  // async addSecUser(firstName, lastName, middleName){
  //   await this.secretary.addSecUser(firstName, lastName, middleName, this.selectedSecRoles.id_sec_role ,this.editedSecId);
  //   await this.getSecUsers()
  // }

  // async getSecUsers(){
  //   this.secUsers = await this.secretary.getSecUsers(this.editedSecId);
  //   console.log('Users',this.secUsers)
  // }

  // async deleteSecUser(id){
  //   await this.secretary.deleteSecUser(id);
  //   await this.getSecUsers()
  // }

  // async editSecUser(id){
  //   this.user = this.secUsers.find(element => element.id_sec_user === id)
  // }

  // async saveSecUser(firstName, lastName, middleName){
  //   await this.secretary.saveSecUser(firstName, lastName, middleName, this.selectedSecRoles.id_sec_role , this.user.id_sec_user);
  //   await this.getSecUsers()
  // }

  students: any = []

  async getStudents(){
    this.students = []
    console.log(this.secGroups)
    for await(let group of this.secGroups){
      const result = await this.secretary.getStudents(group.group_id);
      this.students.push(result)
    }

    this.students = this.students.flat()
    this.students.sort((a,b) => a.user_id - b.user_id)
  }

  selectedStudents: number;

  isPercentEditMode = false
  percentEditModeUser = {}

  percentEditMode(){
    this.isPercentEditMode = !this.isPercentEditMode;

  }

  saveStudent(student = {}){
    this.percentEditModeUser = student;
  }

  studentPercentValue: number;

  async editStudent(){
    console.log(this.studentPercentValue)
    this.students = await this.secretary.updateStudentPercentMark(this.studentPercentValue, this.percentEditModeUser);
    this.studentPercentValue = null
    this.getStudentsByPercentId(this.percent.id_percentage)
  }

  async editStudentEvent(){
    this.students = await this.secretary.updateStudentEventMark(this.studentPercentValue, this.percentEditModeUser);
    this.studentPercentValue = null
    console.log(this.event)
    this.getStudentsByEventId(this.event.id_sec_event)
  }

  async getStudentsByPercentId(id){
    this.students = await this.secretary.getStudentsPercent(id);
  }

  async getStudentsByEventId(id){
    this.event = {id_sec_event: id}
    this.students = await this.secretary.getStudentsEvent(id);
  }

  async getDoc(){
    let data = "";
    this.docService.getDoc(data);
  }

  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }

}
