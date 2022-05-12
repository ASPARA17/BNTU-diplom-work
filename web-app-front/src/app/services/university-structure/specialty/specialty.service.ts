import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


const baseUrl = 'http://localhost:5000/specialty';
@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`)
  }

  getAllByCathedraId(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/all/${id}`, {headers: token});
  }

  create(specialty): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.post(`${baseUrl}/`, specialty, {headers: token});
  }

  update(specialty): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.put(`${baseUrl}/`, specialty,{headers: token});
  }

  delete(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.delete(`${baseUrl}/${id}`, {headers: token});
  }

}
