import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:5000/faculty';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/`, {headers: token})
  }

  getAllByUniversityId(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/${id}`, {headers: token})
  }

  create(faculty): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.post(`${baseUrl}/`, faculty, {headers: token});
  }

  update(faculty): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.put(`${baseUrl}/`, faculty,{headers: token});
  }

  delete(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.delete(`${baseUrl}/${id}`, {headers: token});
  }
}
