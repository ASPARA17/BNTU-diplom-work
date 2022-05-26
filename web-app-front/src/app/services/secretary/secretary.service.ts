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
export class SecretaryService {

  constructor(private http: HttpClient, private router: Router) { }

  async getStud(){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/stud', {
      headers: token
    }).toPromise();
    return data
  }

  async getYears(){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/date', {
      headers: token
    }).toPromise();
    return data
  }

  async postSec(number,start,end,year) {
    const body = {number,start,end,year};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.post('http://localhost:5000/sec',body, {
      headers: token
    }).toPromise();
    return data
  }
/*
  async getSec() {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/sec', {
      headers: token
    }).toPromise();
    return data
  }
*/
  async deleteSec(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/sec/${id}`, {
      headers: token
    }).toPromise();
  }

  async getSecById(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async getCathedra(){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-cathedra`, {
      headers: token
    }).toPromise();
    return data
  }

  async putSecCathedra(cathedraId,secId){
    const body = {cathedraId,secId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-cathedra',body, {
      headers: token
    }).toPromise();
  }

  async getSecCathedra(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-cathedra/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecCathedra(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/sec-cathedra/${id}`, null, {
      headers: token
    }).toPromise();
  }

  async getSpecialty(cathedraId){
    console.log(cathedraId)
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-specialty-cathedra/${cathedraId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async putSecSpecialty(specialtyId,secId){
    const body = {specialtyId,secId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/sec-specialty',body, {
      headers: token
    }).toPromise();
  }

  async getSecSpecialty(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-specialty/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecSpecialty(secId,id){
    const body = {secId,id}
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/sec-specialty/`, body, {
      headers: token
    }).toPromise();
  }

  async getGroup(specId){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-groups/${specId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async putSecGroup(groupId,secId){
    const body = {groupId,secId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/sec-group',body, {
      headers: token
    }).toPromise();
  }

  async getSecGroup(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-group/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecGroup(secId,groupId){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/sec-group/`, {secId,groupId}, {
      headers: token
    }).toPromise();
  }

  async putSecPercent(name,percentPlane,comment, fromDate, toDate, secId, group_id, students){
    const body = {name,percentPlane,comment, fromDate, toDate, secId,group_id, students};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/sec-percent',body, {
      headers: token
    }).toPromise();
  }

  async getSecPercent(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-percent/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecPercent(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/sec-percent/${id}`, {
      headers: token
    }).toPromise();
  }

  async saveSecPercent(name,percentPlane,comment, fromDate, toDate, percentId,students){
    const body = {name,percentPlane,comment, fromDate, toDate, percentId,students};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-percent',body, {
      headers: token
    }).toPromise();
  }


  async putSecEvent(address,selectedGroup,model,time, secId, students){
    const body = {address,selectedGroup,model,time, secId,students};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/sec-event',body, {
      headers: token
    }).toPromise();
  }

  async getSecEvent(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-event/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecEvent(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/sec-event/${id}`, {
      headers: token
    }).toPromise();
  }

  async editSecEvent(address,selectedGroup,model,time, eventId, students){
    const body = {address,selectedGroup,model,time, eventId,students};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-event',body, {
      headers: token
    }).toPromise();
  }

  async getSecRoles(){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-roles`, {
      headers: token
    }).toPromise();
    return data
  }

  async addSecUser(firstName, lastName, middleName, roleId , secId){
    const body = {firstName, lastName, middleName, roleId , secId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/sec-user',body, {
      headers: token
    }).toPromise();
  }

  async getSecUsers(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-users/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteSecUser(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/sec-user/${id}`, {
      headers: token
    }).toPromise();
  }

  async saveSecUser(firstName, lastName, middleName, roleId , userId){
    const body = {firstName, lastName, middleName, roleId , userId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-user',body, {
      headers: token
    }).toPromise();
  }


  async getStudents(groupId){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-students/${groupId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async updateStudentPercentMark(value, user){
    const body = {value, user};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-students-percent-mark',body, {
      headers: token
    }).toPromise();
  }

  async updateStudentEventMark(value, user){
    const body = {value, user};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/sec-students-event-mark',body, {
      headers: token
    }).toPromise();
  }

  async getStudentsPercent(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-students-percent/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async getStudentsEvent(id){
    console.log(id)
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/sec-students-event/${id}`, {
      headers: token
    }).toPromise();
    return data
  }
}
