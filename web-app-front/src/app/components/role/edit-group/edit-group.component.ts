import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../../services/university-structure/group/group.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RolesListComponent} from "../roles-list/roles-list.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpecialtyService} from "../../../services/university-structure/specialty/specialty.service";
import {error} from "protractor";

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  onAddGroup = new EventEmitter();
  onEditGroup = new EventEmitter();
  groupForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;
  specialties:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              private groupService:GroupService,
              public dialogRef:MatDialogRef<EditGroupComponent>,
              private specialtyService: SpecialtyService,
              ) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      //group_id:[null, Validators.required],
      group_name:[null, Validators.required],
      fk_specialty:[null, Validators.required]
    })

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.groupForm.patchValue(this.dialogData.data);
    }

    this.getSpecialties();
  }

  getSpecialties() {
      this.specialtyService.getAll().subscribe((response:any)=> {
        this.specialties = response;
      }, (error:any)=>{
        console.log(error);
      })
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var formData = this.groupForm.value;
    var data = {
      //group_id:formData.group_name,
      group_name:formData.group_name,
      fk_specialty:formData.fk_specialty,
    }
    this.groupService.create(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddGroup.emit();
      this.responseMessage = response.message;
    },(error:any)=>{
      console.log(error);
    })
  }

  edit() {
    var formData = this.groupForm.value;
    var data = {
      group_id:this.dialogData.data.group_id,
      group_name:formData.group_name,
      fk_specialty:formData.fk_specialty,
    }
    this.groupService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditGroup.emit();
      this.responseMessage = response.message;
    },(error:any)=>{
      console.log(error);
    })
  }



}
