import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as _ from 'lodash';

const baseUrl = 'http://localhost:5000/groups';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${baseUrl}/all`)
  }

  create(group): Observable<any> {
    return this.http.post(`${baseUrl}/create`, group);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  getAllByCathedraId(cathedraId): Observable<any> {
    return this.http.get(`${baseUrl}/all/${cathedraId}`)
  }

  getGroupById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  update(group): Observable<any> {
    return this.http.put(`${baseUrl}/update`, group);
  }

  // update(id, group): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, group);
  // }

  //TEST

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    groupName: new FormControl('', Validators.required),
    specialty: new FormControl(0)
  });

  populateForm(group) {
    this.form.setValue(_.omit(group,'specialty'));
  }

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      groupName: '',
      specialty: 0
    });
  }

}
