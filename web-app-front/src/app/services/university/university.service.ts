import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {University} from "../../models/university.model";

const baseUrl = 'http://localhost:5000/university'

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  formData: University;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`)
  }

  getUniversityById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}
