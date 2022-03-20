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
export class DiplomWorkService {

  constructor(private http: HttpClient, private router: Router) {
  }

  async getAllDiplomWorks() {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const diplomWorks = await this.http.get(`http://localhost:5000/diplom-work/all`, {
      headers: token
    }).toPromise();
    return diplomWorks
  }

  async getDiplomWorksByIdLector(leaderId) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const diplomWorks = await this.http.get(`http://localhost:5000/diplom-work/${leaderId}`, {
      headers: token
    }).toPromise();
    return diplomWorks
  }

  async bookDiploma(leaderId, diplomaId) {
    const body = {leaderId, diplomaId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/diplom-work/book_theme', body, {
      headers: token
    }).toPromise();
  }

  async updateStatusDiploma(diplomaId) {
    const body = {diplomaId};
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put('http://localhost:5000/diplom-work/update_status', body, {
      headers: token
    }).toPromise();
  }
}
