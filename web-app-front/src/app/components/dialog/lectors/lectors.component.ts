import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SpecialtyService} from "../../../services/university-structure/specialty/specialty.service";
import {GroupService} from "../../../services/university-structure/group/group.service";
import {LectorService} from "../../../services/lector/lector.service";

@Component({
  selector: 'app-lectors',
  templateUrl: './lectors.component.html',
  styleUrls: ['./lectors.component.scss']
})
export class LectorsComponent implements OnInit {
  onAddLector = new EventEmitter();
  onEditLector = new EventEmitter();
  lectorForm:any = FormGroup;
  dialogAction:any = "Добавить";
  action:any = "Добавить";

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<LectorsComponent>,
              private lectorService:LectorService) { }

  ngOnInit(): void {
    this.lectorForm = this.formBuilder.group( {
      //TODO: add Validators
      vacancy:[null],
      busy_place:[null],
      position:[null],
      initials_lector:[null]
    })

    if (this.dialogData.action === 'Редактировать') {
      this.dialogAction = "Редактировать";
      this.action = "Обновить";
      this.lectorForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Редактировать') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    // TODO: dont need
  }

  edit() {
    var formData = this.lectorForm.value;
    var data = {
      lector_id:this.dialogData.data.lector_id,
      vacancy:formData.vacancy,
      busy_place:formData.busy_place,
      position:formData.position,
      initials_lector:formData.initials_lector
    }
    this.lectorService.updatePlace(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditLector.emit();
    },(error:any)=>{
      console.log(error);
    })
  }

}
