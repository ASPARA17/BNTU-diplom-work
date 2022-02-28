import {
  Injectable
} from '@angular/core';

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
export class AdminService {

  constructor(private http: HttpClient, private router: Router) {}

  async getAllUsers() {
    console.log('allUsers')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/users', {
      headers: token
    }).toPromise();
    return data
  }

  async deleteUser(id) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/user/${id}`, {
      headers: token
    }).toPromise();
  }

  async confirmUser(id) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/user/${id}`, null, {
      headers: token
    }).toPromise();
  }

  async updateUserRole(id, newUserRole) {
    const body = {
      id,
      newUserRole
    }
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/user/role`, body, {
      headers: token
    }).toPromise();
  }

  async getAllStudents() {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/users/students', {
      headers: token
    }).toPromise();
    return data
  }

  async postDate(start,end) {
    const body = {
      yearStart: start,
      yearEnd: end
    }
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/date', body, {
      headers: token
    }).toPromise();
  }

  async getDate() {
    console.log('allDate')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/date', {
      headers: token
    }).toPromise();
    return data
  }

  async deleteDate(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/date/${id}`, {
      headers: token
    }).toPromise();
  }

  async getFaculty() {
    console.log('allFaculty')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/faculty', {
      headers: token
    }).toPromise();
    return data
  }

  async getUniversity() {
    console.log('allUniversity')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/university', {
      headers: token
    }).toPromise();
    return data
  }

  async deleteUniversity(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/university/${id}`, {
      headers: token
    }).toPromise();
  }

  async addUniversity(name, fullName) {
    const body = {name, fullName};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/university', body, {
      headers: token
    }).toPromise();
  }

  async getFacultyAtUniversity(universityId){
    console.log(universityId)
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/faculty-choose/${universityId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async getFacultyByUniversity(universityId){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/faculty/${universityId}`, {
      headers: token
    }).toPromise();
    return data
  }



  async addFaculty(name, fullName, universityId) {
    const body = {name, fullName, universityId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.post('http://localhost:5000/faculty', body, {
      headers: token
    }).toPromise();
  }

  async deleteFaculty(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/faculty/${id}`, {
      headers: token
    }).toPromise();
  }

  async getUniversityById(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/university/${id}`, {
      headers: token
    }).toPromise();
    return data
  }

  async getCathedra(facultyId){
    console.log(facultyId)
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/cathedra/${facultyId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async deleteCathedra(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.delete(`http://localhost:5000/cathedra/${id}`, {
      headers: token
    }).toPromise();
  }

  async getSpecialty(cathedraId){
    console.log(cathedraId)
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/specialty/${cathedraId}`, {
      headers: token
    }).toPromise();
    return data
  }

  async getLecturersDepartment() {
    console.log('allLecturersDepartment')
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get('http://localhost:5000/university', {
      headers: token
    }).toPromise();
    return data
  }


}