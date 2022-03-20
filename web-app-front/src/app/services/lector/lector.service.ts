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


}
