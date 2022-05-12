import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DepartmentService} from "../../../services/university-structure/department/department.service";
import {SpecialtyService} from "../../../services/university-structure/specialty/specialty.service";

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  onAddSpecialty = new EventEmitter();
  onEditSpecialty = new EventEmitter();
  specialtyForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  departments:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<SpecialtyComponent>,
              private departmentService:DepartmentService,
              private specialtyService:SpecialtyService) { }

  ngOnInit(): void {
    this.specialtyForm = this.formBuilder.group( {
      //TODO: add Validators
      fk_cathedra:[null],
      specialty_name:[null],
      specialty_name_full:[null],
      specialty_number:[null]
    })

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.specialtyForm.patchValue(this.dialogData.data);
    }

    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getAll().subscribe((response:any)=> {
      this.departments = response;
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
    var formData = this.specialtyForm.value;
    var data = {
      fk_cathedra:formData.fk_cathedra,
      specialty_name:formData.specialty_name,
      specialty_name_full:formData.specialty_name_full,
      specialty_number:formData.specialty_number
    }
    this.specialtyService.create(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddSpecialty.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

  edit() {
    var formData = this.specialtyForm.value;
    var data = {
      specialty_id:this.dialogData.data.specialty_id,
      fk_cathedra:formData.fk_cathedra,
      specialty_name:formData.specialty_name,
      specialty_name_full:formData.specialty_name_full,
      specialty_number:formData.specialty_number
    }
    this.specialtyService.update(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditSpecialty.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

}
