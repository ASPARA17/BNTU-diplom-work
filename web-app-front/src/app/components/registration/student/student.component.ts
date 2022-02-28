import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { StudyInfoService } from '../../../services/study/study-info.service';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { STUDY } from '../../../constants/globals'
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  university: NgOption[] | any = [];
  faculty: NgOption[] | any = [];
  cathedra: NgOption[] | any = [];
  specialty: NgOption[] | any = [];
  group: NgOption[] | any = [];

  studentForm: FormGroup = new FormGroup({
    "userLogin": new FormControl("", Validators.required),
    "userPassword": new FormControl("", Validators.required),
    "userSecondName": new FormControl("", [Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userFirstName": new FormControl("", [Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userMiddleName": new FormControl("", [Validators.required, Validators.pattern("^[А-Яа-яЁё]+")]),
    "userUniversity": new FormControl(null, Validators.required),
    "userFaculty": new FormControl(null, Validators.required),
    "userCathedra": new FormControl(null, Validators.required),
    "userSpecialty": new FormControl(null, Validators.required),
    "userGroup": new FormControl(null, Validators.required),
  });


  constructor(private studyInfo: StudyInfoService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUniversity();
  }

  get userLogin() {
    return this.studentForm.get('userLogin')
  }
  get userPassword() {
    return this.studentForm.get('userPassword')
  }
  get userSecondName() {
    return this.studentForm.get('userSecondName')
  }
  get userFirstName() {
    return this.studentForm.get('userFirstName')
  }
  get userMiddleName() {
    return this.studentForm.get('userMiddleName')
  }

  async getUniversity() {
    this.university = await this.studyInfo.getAllUniversity().toPromise();
  }

  async getStudyStep(step, select) {
    STUDY[step].id = Object.values(select)[0]
    let trigger: boolean = false;
    for (const name in STUDY) {
      if (STUDY[name].formName === STUDY[step].formName) {
        trigger = true
      }
      if (trigger) {
        this.clearSelects(STUDY[name].formName, name)
      }
    }
    this[step] = await this.studyInfo.getStudyInfo(STUDY[step]).toPromise();
  }

  clearSelects(formName, name) {
    this.studentForm.controls[formName].setValue([])
    this[name] = [];
  }

  async submit() {
    if (!this.studentForm.invalid) {
      this.studentForm.value.userRole = 'student'
      await this.auth.registerUser(this.studentForm.value)
      this.router.navigateByUrl('/student');
    }
  }

  showInvalidFields() {
    const controls = this.studentForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsTouched();
      }
    }
  }
}