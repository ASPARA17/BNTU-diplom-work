import {Component, Inject, Optional} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../../services/university-structure/group/group.service";


export interface GroupData {
  // specialty: any;
  // group_name: string;
  //specialty_name: string;
  groupId: number;
  specialtyList: any;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewDialog {
  currentGroup = null;
  groupId: number;
  local_data: any;
  specialtyList: any;
  //specialtyId = this.local_data.specialty_id;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: GroupData,
    private groupService: GroupService) {
    this.local_data = {...data};
    // this.specialtyList = data.specialtyList;
    // console.log(this.specialtyList)
    //this.local_data = data

  }


  onNoClick(): void {
    this.dialogRef.close();
  }



  doAction(){
    this.dialogRef.close({event:"Update",data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}


