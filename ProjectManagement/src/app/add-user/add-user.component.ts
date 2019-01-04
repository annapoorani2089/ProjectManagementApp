import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { JsonPipe } from '@angular/common/src/pipes';
import { stringify } from '@angular/compiler/src/util';
import { ManagementService } from '../management.service';
declare var $: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  UserModel: User;

  constructor(private _UserService: ManagementService) {
    this.UserModel = new User();
  }
  AddButton: string = "Add User";
  users: User[];
  usersList: User[];
  asc: boolean = true;
  ngOnInit() {
    this.GetAllUser();
  }
  Reset() {
    $("#first_name").val('');
    $("#last_name").val('');
    $("#emp_id").val('');
    this.AddButton = "Add";
  }

  AddUser(userModel: User) {
    if (this.AddButton == "Update") {
      this._UserService.UpdateUser(userModel).subscribe(
        (data) => { this.ngOnInit, alert('user updated successfully') }
      );
    }
    else {
      this._UserService.AddUser(userModel).subscribe(
        (data) => { this.ngOnInit, this.users.push(userModel), alert('user added successfully') }
      );
    }
  }

  GetAllUser() {
    this._UserService.GetAllUser().subscribe((data: User[]) => { this.usersList = data, this.users = data });

  }

  GetAllUsers():User[] {
    this._UserService.GetAllUser().subscribe((data: User[]) => { this.usersList = data, this.users = data });
    return this.users;
  }

  EditUser(user: User) {
    this.UserModel = this.users.find(x => x.user_id == user.user_id);
    this.AddButton = "Update";
  }

  DeleteUser(user: User) {
    this._UserService.DeleteUser(user.user_id).subscribe(
      (data) => { this.ngOnInit, alert('user deleted successfully') });
  }
  //Sorting
  SortByFirstName() {
    if (this.asc) {
      this.users = this.users.sort(function (a, b) { return a.first_name < b.first_name ? -1 : 1 });
      this.asc = false;
    }
    else {
      this.users = this.users.sort(function (a, b) { return b.first_name < a.first_name ? -1 : 1 });
      this.asc = true;
    }
  }

  SortByLastName() {
    if (this.asc) {
      this.users = this.users.sort(function (a, b) { return a.last_name < b.last_name ? -1 : 1 });
      this.asc = false;
    }
    else {
      this.users = this.users.sort(function (a, b) { return b.last_name < a.last_name ? -1 : 1 });
      this.asc = true;
    }
  }

  SortById() {
    if (this.asc) {
      this.users = this.users.sort(function (a, b) { return a.employee_id - b.employee_id });
      this.asc = false;
    }
    else {
      this.users = this.users.sort(function (a, b) { return b.employee_id - a.employee_id });
      this.asc = true;
    }
  }

  FilterUsers(searchText: string) {
    if (searchText == '')
      this.GetAllUser();
    else
      this.users = this.usersList.filter(x => x.first_name.toLowerCase().indexOf(searchText.toLowerCase()) > 0 || x.last_name.toLowerCase().indexOf(searchText.toLowerCase()) > 0);
  }

}
