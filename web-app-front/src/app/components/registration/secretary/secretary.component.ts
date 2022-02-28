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
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  university: NgOption[] | any = [];
  faculty: NgOption[] | any = [];
  cathedra: NgOption[] | any = [];
  specialty: NgOption[] | any = [];
  group: NgOption[] | any = [];

  secretaryForm: FormGroup = new FormGroup({
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
    return this.secretaryForm.get('userLogin')
  }
  get userPassword() {
    return this.secretaryForm.get('userPassword')
  }
  get userSecondName() {
    return this.secretaryForm.get('userSecondName')
  }
  get userFirstName() {
    return this.secretaryForm.get('userFirstName')
  }
  get userMiddleName() {
    return this.secretaryForm.get('userMiddleName')
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
    this.secretaryForm.controls[formName].setValue([])
    this[name] = [];
  }

  async submit() {
    if (!this.secretaryForm.invalid) {
      this.secretaryForm.value.userRole = 'secretary'
      await this.auth.registerUser(this.secretaryForm.value)
      this.router.navigateByUrl('/secretary');
    }
  }

  showInvalidFields() {
    const controls = this.secretaryForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsTouched();
      }
    }
  }

}
