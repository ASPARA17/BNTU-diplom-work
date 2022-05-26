import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const baseUrl = 'http://localhost:5000/sec';
@Injectable({
  providedIn: 'root'
})
export class SecService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}`, {headers: token})
  }

  delete(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    console.log(id)
    return this.http.delete(`${baseUrl}/${id}`, {headers: token});
  }

  create(sec): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.post(`${baseUrl} `, sec, {headers: token});
  }

  getById(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/${id}`, {headers: token})
  }

  getAllByUserId(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/by_user/${id}`, {headers: token})
  }

  updateCathedraId(cathedraId, secId): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.put(`${baseUrl}`, [cathedraId, secId], {headers: token});
  }
}
