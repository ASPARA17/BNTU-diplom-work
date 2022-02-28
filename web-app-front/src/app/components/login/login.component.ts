import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService ,private router: Router) { }

  status;

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    "userLogin": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required),
  });

  get userLogin() {
    return this.loginForm.get('userLogin')
  }
  get userPassword() {
    return this.loginForm.get('userPassword')
  }

  async submit() {
    if (!this.loginForm.invalid) {
      this.status = await this.auth.loginUser(this.loginForm.value);
    }
  }

  showInvalidFields() {
    const controls = this.loginForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsTouched();
      }
    }
  }

}
