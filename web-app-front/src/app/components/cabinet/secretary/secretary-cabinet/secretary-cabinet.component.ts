import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import {SecretaryService} from '../../../../services/secretary/secretary.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {NgbDate,NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-secretary-cabinet',
  templateUrl: './secretary-cabinet.component.html',
  styleUrls: ['./secretary-cabinet.component.scss']
})
export class SecretaryCabinetComponent implements OnInit {
  userName = JSON.parse(localStorage.getItem('user'));
  active = 1;
  sec: any = [];
  years: any = [];
  selectedGroup:any = {};
  selectedYear: any = [];
  isEditOpen: any = true;
  secretaryData: any = {};
  specialtyData: any = {};
  groupData: any = {};
  hoveredDate: NgbDate | null = null;
  cathedra: any = [];
  secCathedra: any = [];
  specialty: any = [];
  secSpecialty: any = [];
  percent: any = [];
  secPercent: any = [];
  group: any = [];
  secGroup: any = [];
  event: any = [];
  secEvent: any = [];
  selectedSecRoles: any = [];
  secUsers: any = [];
  user: any = [];
  secRoles: any = [];
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  secId: any = '';

  timeStart = {hour: 13, minute: 30};
  timeEnd = {hour: 13, minute: 30};
  model: NgbDateStruct;
  date: {year: number, month: number, day: number};

  secretaryForm:FormGroup = new FormGroup({
    "secYear": new FormControl("", Validators.required),
  })

  constructor(private modalService: NgbModal, private calendar: NgbCalendar, private secretary: SecretaryService) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getSec()
    this.getCathedra()
    this.getYears();
    this.getSecRoles()
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

  async addSec(number,text){
    if(text){
      number += `-${text}`;
    }
    await this.secretary.postSec(number,Object.values(this.fromDate).join('-'),Object.values(this.toDate).join('-'),this.selectedYear.year_id)
    this.selectedYear = ''
    await this.getSec()
  }

  async getSec(){
    this.sec = await this.secretary.getSec()
  }

  async deleteSec(id){
    await this.secretary.deleteSec(id)
    await this.getSec()
  }

  async openEditSec(id){
    this.isEditOpen = !this.isEditOpen;
    this.secId = id;
    this.secretaryData = await this.secretary.getSecById(id)
  }

  async getCathedra(){
    this.cathedra = await this.secretary.getCathedra();
  }


  async putCathedra(id){
    await this.secretary.putSecCathedra(id, this.secId);
    for(let spec of this.secSpecialty){
      this.deleteSecSpecialty(spec.specialty_id)
    }
    this.getSecCathedra()
  }

  async getSecCathedra(){
    this.secCathedra = await this.secretary.getSecCathedra(this.secId);
    this.getSpecialty()
  }

  async deleteSecCathedra(){
    await this.secretary.deleteSecCathedra(this.secId);
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
    await this.secretary.putSecSpecialty(id, this.secId);
    this.getSecSpecialty()
  }

  async getSecSpecialty(){
    this.secSpecialty = await this.secretary.getSecSpecialty(this.secId);
    this.group = [];
    for await (let spec of this.secSpecialty){
      this.getGroup(spec.specialty_id)
    }
    
  }

  async deleteSecSpecialty(specId){
    await this.secretary.deleteSecSpecialty(this.secId,specId);  // удалять группы из sec_group и удалять юзеров из student_marks 
    for await(let group of this.secGroup){
      if(group.fk_specialty == specId){
        console.log('Delete Group by Id',group.group_id)
        this.deleteSecGroup(group.group_id)
      }
    }
    this.getSecSpecialty()
  }

  async getGroup(specId){
    const result = await this.secretary.getGroup(specId);
    this.group.push(result)
    this.group = this.group.flat()
  }


  async putGroup(id){
    console.log(id)
    await this.secretary.putSecGroup(id, this.secId);
    this.getSecGroup()
  }

  async getSecGroup(){
    this.secGroup = await this.secretary.getSecGroup(this.secId);
  }

  async deleteSecGroup(groupId){
    await this.secretary.deleteSecGroup(this.secId,groupId);  ///// отредактировать удаление
    this.getSecGroup()
  }

  async addPercent(name,percentPlane,comment){
    console.log(this.selectedStudents)
    await this.secretary.putSecPercent(name,percentPlane,comment, Object.values(this.model).join('-'),Object.values(this.toDate).join('-'), this.secId, this.secGroup.group_id,this.selectedStudents);
    await this.getSecPercent()
  }

  async getSecPercent(){
    this.secPercent = await this.secretary.getSecPercent(this.secId);
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
    await this.secretary.putSecEvent(address,this.selectedGroup.group_name, Object.values(this.model).join('-'),`${startTime} / ${endTime}`, this.secId, this.selectedStudents);
    await this.getSecEvent()
  }

  async getSecEvent(){
    this.secEvent = await this.secretary.getSecEvent(this.secId);
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

  async addSecUser(firstName, lastName, middleName){
    await this.secretary.addSecUser(firstName, lastName, middleName, this.selectedSecRoles.id_sec_role ,this.secId);
    await this.getSecUsers()
  }

  async getSecUsers(){
    this.secUsers = await this.secretary.getSecUsers(this.secId);
    console.log('Users',this.secUsers)
  }

  async deleteSecUser(id){
    await this.secretary.deleteSecUser(id);
    await this.getSecUsers()
  }

  async editSecUser(id){
    this.user = this.secUsers.find(element => element.id_sec_user === id)
  }

  async saveSecUser(firstName, lastName, middleName){
    await this.secretary.saveSecUser(firstName, lastName, middleName, this.selectedSecRoles.id_sec_role , this.user.id_sec_user);
    await this.getSecUsers()
  }

  students: any = []

  async getStudents(){
    this.students = []
    console.log(this.secGroup)
    for await(let group of this.secGroup){
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


}
