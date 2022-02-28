import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyInfoService {

  constructor(private http: HttpClient) { }
  
  getAllUniversity(){
    return this.http.get('http://localhost:5000/university');
  }

  getStudyInfo(body){
    return this.http.post(`http://localhost:5000/study/`, body);
  }
  
}
