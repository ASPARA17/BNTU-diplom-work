import { Component, OnInit } from '@angular/core';
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  role = {
    example: '',
    name: ''
  };
  submitted = false;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
  }

  saveRole(): void {
    const data = {
      example: this.role.example,
      name: this.role.name
    };
    this.roleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRole(): void {
    this.submitted = false;
    this.role = {
      example: '',
      name: ''
    };
  }
}
