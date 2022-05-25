import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const baseUrl = 'http://localhost:5000/sec_role';
@Injectable({
  providedIn: 'root'
})
export class SecRoleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}`, {headers: token})
  }
}
