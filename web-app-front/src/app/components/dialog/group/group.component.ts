import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {SpecialtyService} from "../../../services/university-structure/specialty/specialty.service";
import {GroupService} from "../../../services/university-structure/group/group.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  onAddGroup = new EventEmitter();
  onEditGroup = new EventEmitter();
  groupForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  specialties :any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<GroupComponent>,
              private specialtyService:SpecialtyService,
              private groupService:GroupService) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group( {
      //TODO: add Validators
      group_name:[null],
      fk_specialty:[null]
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
      group_name:formData.group_name,
      fk_specialty:formData.fk_specialty
    }
    this.groupService.create(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddGroup.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

  edit() {
    var formData = this.groupForm.value;
    var data = {
      group_id:this.dialogData.data.group_id,
      group_name:formData.group_name,
      fk_specialty:formData.fk_specialty
    }
    this.groupService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditGroup.emit();
    },(error:any)=>{
      console.log(error);
    })
  }
}
