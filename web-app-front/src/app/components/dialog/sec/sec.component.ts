import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {YearService} from "../../../services/year/year.service";
import {SecService} from "../../../services/sec-structure/sec/sec.service";

@Component({
  selector: 'app-sec',
  templateUrl: './sec.component.html',
  styleUrls: ['./sec.component.scss']
})
export class SecComponent implements OnInit {
  onAddSec = new EventEmitter();
  onEditSec = new EventEmitter();
  secForm:any = FormGroup;
  dialogAction:any = "Добавить";
  action:any = "Добавить";
  years :any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<SecComponent>,
              private yearService:YearService,
              private secService:SecService) { }

  ngOnInit(): void {
    this.secForm = this.formBuilder.group( {
      //TODO: add Validators
      sec_number:[null],
      sec_start_date:[null],
      sec_end_date:[null],
      year_id:[null]
    })

    if (this.dialogData.action === 'Редактировать') {
      this.dialogAction = "Редактировать";
      this.action = "Обновить";
      this.secForm.patchValue(this.dialogData.data);
    }

    this.getYears();
  }

  getYears() {
    this.yearService.getAll().subscribe((response:any)=> {
      this.years = response;
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
    let formData = this.secForm.value;

    let data = {
      sec_number:formData.sec_number,
      sec_start_date:formData.sec_start_date,
      sec_end_date:formData.sec_end_date,
      year_id:formData.year_id
    }
    // format 'dd.mm.yyyy'
    data.sec_start_date = data.sec_start_date.toLocaleDateString();
    data.sec_end_date = data.sec_end_date.toLocaleDateString();
    //console.log((data.sec_start_date).toLocaleDateString())
    this.secService.create(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddSec.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

  edit() {
    // var formData = this.secForm.value;
    // var data = {
    //   group_id:this.dialogData.data.group_id,
    //   group_name:formData.group_name,
    //   fk_specialty:formData.fk_specialty
    // }
    // this.groupService.update(data).subscribe((response:any)=>{
    //   this.dialogRef.close();
    //   this.onEditSec.emit();
    // },(error:any)=>{
    //   console.log(error);
    // })
  }
}
