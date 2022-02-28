import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeadOfDepartmentService {

  constructor(private http: HttpClient, private router: Router) {}

  async getInfoLectors(cathedraId) {
    console.log('lectorsInfo')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const lectors = await this.http.get(`http://localhost:5000/lectors-info/${cathedraId}`, {
      headers: token
    }).toPromise();
    return lectors
  }

  async getInfoStudentsByCathedra(cathedraId) {
    console.log('studentsInfo')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const students = await this.http.get(`http://localhost:5000/students_info/${cathedraId}`, {
      headers: token
    }).toPromise();
    return students
  }

  async getUsersByCathedra(cathedraId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const users = await this.http.get(`http://localhost:5000/users/${cathedraId}`, {
      headers: token
    }).toPromise();
    return users
  }

  async getSpecialtiesByCathedra(cathedraId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const specialty = await this.http.get(`http://localhost:5000/specialty/${cathedraId}`, {
      headers: token
    }).toPromise();
    return specialty
  }

  async getGroupsByCathedra(cathedraId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const groups = await this.http.get(`http://localhost:5000/groups/${cathedraId}`, {
      headers: token
    }).toPromise();
    return groups
  }

  async deleteSpecialty(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/specialty/${id}`, {
      headers: token
    }).toPromise();
  }

  async addSpecialty(cathedraId, name, fullName, number) {
    const body = {cathedraId, name, fullName, number};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/specialty', body, {
      headers: token
    }).toPromise();
  }

  async editSpecialty(specialtyId, name, fullName, number) {
    const body = {specialtyId, name, fullName, number};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/specialty', body, {
      headers: token
    }).toPromise();
  }

  //TODO add second param
  async getStudentsByGroupId(cathedraId, groupId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const students = await this.http.get(`http://localhost:5000/filter_students/${groupId}`, {
      headers: token
    }).toPromise();
    console.log(students);
    return students;
  }

  async addGroup(groupName, specialtyId) {
    console.log('hiiii');
    const body = {groupName, specialtyId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/groups/add_group', body, {
      headers: token
    }).toPromise();
  }

  async deleteGroup(groupId): Promise<void> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/groups/${groupId}`, {
      headers: token
    }).toPromise();
  }

}
