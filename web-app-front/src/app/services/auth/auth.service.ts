import {
  Injectable
} from '@angular/core';
import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  async loginUser(body){
    try{
    const data = await this.http.post('http://localhost:5000/login', body).toPromise();
    localStorage.setItem('token',data['token']);
    this.router.navigateByUrl(`/${data['role']}`);
    } catch(error){
      console.log(error)
      return error.status;
    }
  }

  async registerUser(body) {
    //register
    const data = await this.http.post('http://localhost:5000/registration-student', body).toPromise();
    localStorage.setItem('token',data['token'])
  }

  async checkRole(){
    if(localStorage.getItem('token')){
    const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
    const user = await this.http.get('http://localhost:5000/user-data', {headers:token}).toPromise();
    localStorage.setItem('user', JSON.stringify(user));
    console.log("load userName")
    return {role:user['role'], confirm: user['user_confirm']};
    } else {
      return null
    }
  }

  async saveInfoUserByRole(role){
    if (localStorage.getItem('token')) {
      const token = new HttpHeaders().set('auth-token', localStorage.getItem('token'));
      const userInfo = await this.http.get(`http://localhost:5000/user-info/${role}`, {headers: token}).toPromise();
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      console.log("load userInfo")
    }

}

  async logout() {
    //localStorage.removeItem('token');
    localStorage.clear();
  }
}