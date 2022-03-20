import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeadOfDepartmentService } from 'src/app/services/headOfDepartment/head-of-department.service';
import { DiplomWorkService } from 'src/app/services/diplomWork/diplom-work.service';
import {LectorService} from "../../../../services/lector/lector.service";

@Component({
  selector: 'app-lector-cabinet',
  templateUrl: './lector-cabinet.component.html',
  styleUrls: ['./lector-cabinet.component.scss']
})
export class LectorCabinetComponent implements OnInit {

  userName = JSON.parse(localStorage.getItem('user'));
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  studentsList;
  diplomWorksList;
  allDiplomWorksList
  active = 1;
  vacancyList = [];
  vacancyMap = new Map();
  studentsLector;


  constructor(private authService: AuthService,
              private router: Router,
              private headOfDepartment: HeadOfDepartmentService,
              private diplomWork: DiplomWorkService,
              private lector: LectorService) { }

  ngOnInit(): void {
    this.getInfoLStudents();
    this.getAllDiplomWorks();
    this.getDiplomWorksByIdLector();
    this.initVacancyList();
    this.getStudentsByLeaderId();
    //this.initMap();
  }

  async getInfoLStudents() {
    this.studentsList = await this.headOfDepartment.getInfoStudentsByCathedra(this.userInfo.cathedra_id)
    this.studentsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
  }

  // все дипломные работы
  async getAllDiplomWorks() {
    console.log("all diplom work")
    this.allDiplomWorksList = await this.diplomWork.getAllDiplomWorks()
  }

  async getDiplomWorksByIdLector() {
    console.log("diplom work by lector")
    this.diplomWorksList = await this.diplomWork.getDiplomWorksByIdLector(this.userInfo.lector_id)
  }

  async initVacancyList() {
    if (this.userInfo.vacancy !== 0) {
      for (var i = 0; i < this.userInfo.vacancy; i++) {
        this.vacancyList[i] = [i + 1];
      }
    }
  }

  async initMapKeys() {
    if (this.userInfo.vacancy !== 0) {
      for (var i = 0; i < this.userInfo.vacancy; i++) {
        this.vacancyMap.set(i+1, null);

      }
    }
    console.log(this.vacancyMap)

    for (let [key, value] of this.vacancyMap) {
      console.log(key, value);
    }

    for (let map of this.vacancyMap) {
      console.log(map);
    }

  }

  async initMapValues() {
    if (this.userInfo.vacancy !== 0) {
      for (var i = 0; i < this.userInfo.vacancy; i++) {
        this.vacancyMap.set(i+1, null);
      }
    }
  }

  async filterDiplomaByStatus(groupId) {
    this.studentsList = await this.headOfDepartment.getStudentsByGroupId(this.userInfo.cathedra_id, groupId)
    this.studentsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
    console.log(this.studentsList)
  }

  async getStudentsByLeaderId() {
    this.studentsLector = await this.lector.getStudentsByLeaderId(this.userInfo.lector_id)
  }

  async bookDiploma(diplomaId) {
    await this.diplomWork.bookDiploma(this.userInfo.lector_id, diplomaId);
    //await this.diplomWork.updateStatusDiploma(diplomaId);
    await this.getAllDiplomWorks();
    await this.getDiplomWorksByIdLector();

  }


  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }
}
