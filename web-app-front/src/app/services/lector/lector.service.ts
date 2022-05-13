import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Router
} from '@angular/router';
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:5000/lector';
@Injectable({
  providedIn: 'root'
})
export class LectorService {

  constructor(private http: HttpClient, private router: Router) {
  }

  async getStudentsByLeaderId(leaderId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const students = await this.http.get(`http://localhost:5000/students/${leaderId}`, {
      headers: token
    }).toPromise();
    return students
  }

  getAll(): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/`, {headers: token})
  }

  updatePlace(lector): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.put(`${baseUrl}/place`, lector, {headers: token});
  }

  getStudentsAndTopicsList(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/list_student/${id}`, {headers: token})
  }


}
