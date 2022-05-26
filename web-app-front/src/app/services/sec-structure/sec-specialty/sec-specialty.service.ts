import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:5000/sec_specialty';
@Injectable({
  providedIn: 'root'
})
export class SecSpecialtyService {

  constructor(private http: HttpClient) { }

  getAllBySecId(id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`${baseUrl}/${id}`, {headers: token})
  }

  delete(secId, id): Observable<any> {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.delete(`${baseUrl}/${secId}&${id}`, {headers: token});
  }
}
