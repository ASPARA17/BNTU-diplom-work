import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  constructor(private http: HttpClient) { }

  getUsersByRole(role){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.get(`http://localhost:5000/users/${role}`, {headers:token}).toPromise();
  }

  postDiplomaWork(body){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    return this.http.post(`http://localhost:5000/users/work`,body ,{headers:token}).toPromise();
  }

  async getDiplomaWork(id){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const data = await this.http.get(`http://localhost:5000/user/work/${id}`,{headers:token}).toPromise();
    return data
  }

  async updateDiplomaWork(body){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    await this.http.put(`http://localhost:5000/users/work`,body,{headers:token}).toPromise();
  }
  
}
