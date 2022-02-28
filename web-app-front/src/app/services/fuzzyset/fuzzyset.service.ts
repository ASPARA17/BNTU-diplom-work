import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as FuzzySet from './module/fuzzyset.js'

@Injectable({
  providedIn: 'root'
})
export class FuzzysetService {

  constructor(private http: HttpClient) { }
  
  fuzzyset(array,name){
    let a = FuzzySet(array);
    console.log(array,name,a.get(name))
    return a.get(name);
  }

  async getCourseWorks(name) {
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    let courseWorks: any = await this.http.get('http://localhost:5000/fuzzyset', {headers:token}).toPromise();
    courseWorks = courseWorks.map( element => Object.values(element).join())
    let result = await this.fuzzyset(courseWorks,name)
    return result;
  }

}
