import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Group} from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {
  }

  url = 'http://localhost:5000/groups/all';
  // tslint:disable-next-line:typedef
  // getGroups() {
  //   return this.http.get<Group[]>(this.url);
  // }

  async getGroups() {
    console.log("hi service")
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get<Group[]>(this.url, {
      headers: token
    }).toPromise()
  }
}
