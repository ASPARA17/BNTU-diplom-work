import {Component, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {Group} from "../../../models/group.model";
import {GroupService} from "../../../services/university-structure/group/group.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {DialogOverviewDialog} from "../dial/dialog-overview-dialog.component";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {SpecialtyService} from "../../../services/university-structure/specialty/specialty.service";
import {EditGroupComponent} from "../edit-group/edit-group.component";
import {UniversityService} from "../../../services/university-structure/university/university.service";
import {University} from "../../../models/university.model";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  displayedColumns: string[] = ['specialty_name', 'groupName', 'action'];
  dataSource: any;
  responseMessage: any;


  groupsList;
  currentGroup = null;

  animal: string;
  name: string;

  specialtyList;

  university: University;
  universityList: University[];

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  private message: string;

  constructor(private groupService: GroupService,
              private specialtyService: SpecialtyService,
              public dialog: MatDialog,
              private universityService: UniversityService,
              private router:Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // //this.getNewGroups();
    // this.getAllGroups();
    // this.getGroup(1);
    // this.getAllSpecialties();
    // this.getUniversity(1);
    // this.getAllUniversity();

    this.tableData();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  tableData() {
    this.groupService.getAll().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error: any)=>{
      console.log(error);
    });
  }

  handleEditAction(values:any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(EditGroupComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditGroup.subscribe((response)=> {
      this.tableData();
    })
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(EditGroupComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddGroup.subscribe((response)=> {
      this.tableData();
    })
  }





  async getNewGroups() {
    this.groupService.getAllByCathedraId(2)
      .subscribe(
        data => {
          this.groupsList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  async getAllGroups() {
    this.groupService.getAll()
      .subscribe(
        data => {
          this.groupsList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
/*
  async getGroup(id) {
    this.groupService.getGroupById(id)
      .subscribe(
        data => {
          this.currentGroup = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }*/

  updateGroup(group): void {
    //group.group_name = "test"
    this.groupService.update(group)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The group was updated successfully!';
        },
        error => {
          console.log(error);
        });
    console.log(group)
  }

  editDialog(group): void {
    let specialtyList = this.specialtyList
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data:{specialtyList: specialtyList, group_id: group.group_id, group_name: group.group_name,
        specialty_id: group.specialty.specialty_id, specialty_name: group.specialty.specialty_name}
      //data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){

        this.updateGroup(result.data);
      }
    });
  }

  getAllSpecialties() {
    this.specialtyService.getAll()
      .subscribe(
        data => {
          this.specialtyList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  onEdit(group){
    //this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EditGroupComponent,dialogConfig);
  }

  async getUniversity(id) {
    this.universityService.getUniversityById(id)
      .subscribe(
        data => {
          this.university = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getAllUniversity() {
    this.universityService.getAll()
      .subscribe(
        data => {
          this.universityList = data as University[];
          console.log(data);
        },
        error => {
          console.log(error);
        });

    //this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog1.html',
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


