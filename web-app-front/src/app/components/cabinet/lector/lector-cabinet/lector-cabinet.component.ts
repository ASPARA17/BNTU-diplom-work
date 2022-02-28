import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeadOfDepartmentService } from 'src/app/services/headOfDepartment/head-of-department.service';
import { DiplomWorkService } from 'src/app/services/diplomWork/diplom-work.service';

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
  active = 1;
  vacancyList = [];
  vacancyMap = new Map();


  constructor(private authService: AuthService,
              private router: Router,
              private headOfDepartment: HeadOfDepartmentService,
              private diplomWork: DiplomWorkService) { }

  ngOnInit(): void {
    this.getInfoLStudents();
    //this.getAllDiplomWorks();
    this.getDiplomWorksByIdLector();
    this.initVacancyList();
    //this.initMap();
  }

  async getInfoLStudents() {
    this.studentsList = await this.headOfDepartment.getInfoStudentsByCathedra(this.userInfo.cathedra_id)
    this.studentsList.sort((a, b) => (a.user_second_name > b.user_second_name) ? 1 : -1)
  }

  // все дипломные работы
  async getAllDiplomWorks() {
    this.diplomWorksList = await this.diplomWork.getAllDiplomWorks()
  }

  async getDiplomWorksByIdLector() {
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



  async logoutUser() {
    console.log("Выйти");
    this.authService.logout();
    // TODO: fix URL
    this.router.navigateByUrl(`/login`);
    return false;
  }
}
