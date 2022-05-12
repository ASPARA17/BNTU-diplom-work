import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:5000/university'

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`)
  }

  // TODO delete
  getUniversityById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(university): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.post(`${baseUrl}/`, university, {headers: token});
  }

  update(university): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.put(`${baseUrl}/`, university,{headers: token});
  }

  delete(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.delete(`${baseUrl}/${id}`, {headers: token});
  }
}
