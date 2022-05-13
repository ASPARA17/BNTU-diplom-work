import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LectorService} from "../../../services/lector/lector.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  studentsAndTopicsColumns: string[] = ['idList', 'topic', 'group', 'studentName','action'];
  studentsAndTopics: any;

  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,
              private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<StudentsListComponent>,
              private lectorService: LectorService) { }

  ngOnInit(): void {


    this.studentsAndTopicsTableData()
  }

  studentsAndTopicsTableData() {
    this.lectorService.getStudentsAndTopicsList(this.dialogData.data.lector_id).
    subscribe((response: any) => {
      this.studentsAndTopics = new MatTableDataSource(response);
      console.log(this.studentsAndTopics)
    }, (error: any)=>{
      console.log(error);
    });
  }

}
