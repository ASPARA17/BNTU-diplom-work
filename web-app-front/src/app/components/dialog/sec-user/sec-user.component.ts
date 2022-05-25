import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {YearService} from "../../../services/year/year.service";
import {SecService} from "../../../services/sec-structure/sec/sec.service";
import {SecUserService} from "../../../services/sec-structure/sec-user/sec-user.service";
import {LectorService} from "../../../services/lector/lector.service";
import {SecRoleService} from "../../../services/sec-structure/sec-role/sec-role.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-sec-user',
  templateUrl: './sec-user.component.html',
  styleUrls: ['./sec-user.component.scss']
})
export class SecUserComponent implements OnInit {
  onAddSecUser = new EventEmitter();
  onEditSecUser = new EventEmitter();
  secUserForm:any = FormGroup;
  dialogAction:any = "Добавить";
  action:any = "Добавить";
  lectors :any = [];
  secs :any = [];
  secRoles :any = [];
  secretaries :any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<SecUserComponent>,
              private secUserService:SecUserService,
              private lectorService:LectorService,
              private secService:SecService,
              private secRoleService:SecRoleService,
              private userService:UserService) { }

  ngOnInit(): void {
    this.secUserForm = this.formBuilder.group( {
      //TODO: add Validators
      firstname:[null],
      lastname:[null],
      middlename:[null],
      id_user:[null],
      id_sec_role:[null],
      id_sec:[null]
    })

    if (this.dialogData.action === 'Редактировать') {
      this.dialogAction = "Редактировать";
      this.action = "Обновить";
      this.secUserForm.patchValue(this.dialogData.data);
    }

    //this.getYears();
    this.getLectors();
    this.getSecRoles();
    this.getSecretaries();
  }

  getLectors() {
    this.lectorService.getAll().subscribe((response:any)=> {
      this.lectors = response;
    }, (error:any)=>{
      console.log(error);
    })
  }

  // dont need
  getSecs() {
    this.secService.getAll().subscribe((response:any)=> {
      this.secs = response;
    }, (error:any)=>{
      console.log(error);
    })
  }

  getSecRoles() {
    this.secRoleService.getAll().subscribe((response:any)=> {
      this.secRoles = response;
    }, (error:any)=>{
      console.log(error);
    })
  }

  getSecretaries() {
    this.userService.getAllSecretary().subscribe((response:any)=> {
      this.secretaries = response;
    }, (error:any)=>{
      console.log(error);
    })
  }

  handleSubmit() {
    if (this.dialogAction === 'Редактировать') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let formData = this.secUserForm.value;

    let data = {
      firstname:formData.firstname,
      lastname:formData.lastname,
      middlename:formData.middlename,
      id_user:formData.id_user,
      id_sec_role:formData.id_sec_role,
      id_sec:this.dialogData.secId,
    }
    this.secUserService.create(data).subscribe((response:any)=>{
      console.log(data);
      this.dialogRef.close();
      this.onAddSecUser.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

  edit() {
    var formData = this.secUserForm.value;
    var data = {
      id_sec_user:this.dialogData.data.id_sec_user,
      firstname:formData.firstname,
      lastname:formData.lastname,
      middlename:formData.middlename,
      id_user:formData.id_user,
      id_sec_role:formData.id_sec_role,
      id_sec:formData.id_sec
    }
    this.secUserService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditSecUser.emit();
    },(error:any)=>{
      console.log(error);
    })
  }
}
