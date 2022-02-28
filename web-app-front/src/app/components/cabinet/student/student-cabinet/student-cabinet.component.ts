import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FuzzysetService} from '../../../../services/fuzzyset/fuzzyset.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UsersInfoService } from '../../../../services/users/users-info.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { NgOption } from '@ng-select/ng-select';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-student-cabinet',
  templateUrl: './student-cabinet.component.html',
  styleUrls: ['./student-cabinet.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class StudentCabinetComponent implements OnInit {
  lectors: NgOption[] | any = [];
  user = JSON.parse(localStorage.getItem('user'));
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  percents: any;
  diplomWork: any = [];
  formParams: any;

  diplomaForm: FormGroup = new FormGroup({
    "studentWorkName": new FormControl("", Validators.required),
    "studentWorkLector": new FormControl(null, Validators.required),
  });

  constructor(private fuzzy: FuzzysetService, private modalService: NgbModal, private usersInfo: UsersInfoService, private authService: AuthService) { }

  async ngOnInit(){
    this.getDiplomaWork()
    this.getUsers('lector');
  }

  async getDiplomaWork(){
    this.diplomWork = await this.usersInfo.getDiplomaWork(this.user.user_id);
    if(!this.diplomWork.length){
      console.log('work')
      this.diplomWork = []
    }
    console.log(this.user.user_id)
   
    console.log(this.diplomWork)
  }

  get studentWorkName() {
    return this.diplomaForm.get('studentWorkName')
  }

  get studentWorkLector() {
    return this.diplomaForm.get('studentWorkLector')
  }

  async getUsers(role){
    if(role === 'lector'){
      this.lectors = await this.usersInfo.getUsersByRole(role)
      this.lectors.map((i) => { i.fullName = `${i.user_second_name} ${i.user_first_name} ${i.user_middle_name} `; return i; });
    }
    
  }

  result:string = '';
  getPercents(name){
    if(this.diplomaForm.get('studentWorkName').value){
      this.fuzzy.getCourseWorks(name).then(data => {this.percents = `${(data[0][0] * 100).toFixed(2)}`
      this.result = data[0][1];
    });
    } else {
      this.diplomaForm.get('studentWorkName').markAsTouched()
    }
   
  }

  open(content, params) {
    this.modalService.open(content, {size: 'lg' });
    this.formParams = params;
    console.log(params)
    if(params === 'update'){
      this.diplomaForm.controls['studentWorkName'].setValue(this.diplomWork[0].name);
      this.diplomaForm.controls['studentWorkLector'].setValue(parseInt(this.diplomWork[0].id_leader))
    }
  }

  async submitDiplomaForm(){
    if(this.formParams == 'update'){
      this.diplomaForm.value.userId = this.user.user_id
      this.usersInfo.updateDiplomaWork(this.diplomaForm.value)
      console.log(this.diplomaForm.value)
    } else if (this.formParams == 'insert'){
      this.diplomaForm.value.userId = this.user.user_id
      this.usersInfo.postDiplomaWork(this.diplomaForm.value)
    }
    this.getDiplomaWork()
  }

}
