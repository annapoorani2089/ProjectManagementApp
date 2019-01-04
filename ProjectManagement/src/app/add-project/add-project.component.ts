import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { User } from '../User';
import { Project } from '../Models/Project';
import { toDate } from '@angular/common/src/i18n/format_date';
declare var $: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  users: User[];
  usersList: User[];
  userModel: User;
  selectedProject: Project;
  projectModel: Project;
  projects: Project[];
  prjFilter: Project[] = [];
  startDateAsc: boolean = true;
  endDateAsc: boolean = true;
  completedAsc: boolean = true;
  priorityAsc: boolean = true;
  AddButton: string = "Add";
  constructor(private _projectService: ManagementService) {

  }

  ngOnInit() {
    this.projectModel = new Project();
    this.GetAllProject();
    this.GetAllUsers();

    $(document).ready(function () {
      /* $('#dateselection').change(function () {
         if ($(this).is(":checked")) {
           $('#start_date').attr('readonly', false);
           $('#end_date').attr('readonly', false);
         }
         else {
           $('#start_date').attr('readonly', true);
           $('#end_date').attr('readonly', true);
         }
       });*/
    });
  }
  Reset() {
    $("#project_name").val('');
    $("#start_date").val('');
    $("#end_date").val('');
    $("#manager").val('');
    this.AddButton = "Add";
  }

  DateSelection() {
    if ($("#dateselection").is(":checked")) {
      $('#start_date').attr('readonly', false);
      $('#end_date').attr('readonly', false);
      var newdate = new Date();
      newdate.setDate(new Date().getDate());
      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
      var startDate = year + "-" + mm1 + "-" + dd1;
      newdate.setDate(new Date().getDate() + 1);
      mm = newdate.getMonth() + 1;
      dd = newdate.getDate();
      year = newdate.getFullYear();
      mm1;
      dd1;
      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;
      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;
      var endDate = year + "-" + mm1 + "-" + dd1;
      this.SetEndDate(endDate);
      this.SetStartDate(startDate);
    }
    else {
      $('#start_date').attr('readonly', true);
      $('#end_date').attr('readonly', true);
    }
  }

  GetAllUsers() {
    this._projectService.GetAllUser().subscribe((data: User[]) => { this.usersList = data, this.users = data });
    this.userModel = new User();
  }

  GetAllProject() {
    this._projectService.GetAllProject().subscribe((data: Project[]) => { this.prjFilter = data, this.projects = data });
  }

  FilterUsers(searchText: string) {
    if (searchText == '')
      this.GetAllUsers();
    else
      this.users = this.usersList.filter(x => x.first_name.toLowerCase().indexOf(searchText.toLowerCase()) > 0 || x.last_name.toLowerCase().indexOf(searchText.toLowerCase()) > 0);
  }

  FilterProject(searchText: string) {
    if (searchText == '')
      this.GetAllProject();
    else {
      this.projects = this.prjFilter.filter(x => x.project1.toLowerCase().indexOf(searchText.toLowerCase()) > 0);
    }

  }
  SetStartDate(startdate: any) {
    this.projectModel.start_date = startdate;
  }
  SetEndDate(endDate: any) {
    this.projectModel.end_date = endDate;
  }
  SelectUser(user: User) {
    this.userModel = user;
    $("#manager").val(user.first_name + " " + user.last_name);
    this.projectModel.user_id = user.user_id;
  }
  ValidateForm(projectModel: Project): boolean {
    var isChecked = $('#dateselection').is(":checked");
    if (isChecked == true) {
      if ($('#end_date').val() < $('#start_date').val()) {
        alert('Start Date must be less than End Date');
        return false;
      }
    }
    if (projectModel.project1 == null) {
      alert("Project Name is required");
      return false;
    }
    return true;
  }
  AddProject(projectModel: Project) {
    if (!this.ValidateForm(projectModel))
      return;
    if (this.AddButton == "Update") {
      this._projectService.UpdateProject(projectModel).subscribe(
        (data) => { this.ngOnInit, alert('Project updated successfully') }
      );
    }
    else {
      this._projectService.AddProject(projectModel).subscribe(
        (data) => { this.ngOnInit, this.projects.push(projectModel), alert('project added successfully') }
      );
    }
  }

  EditProject(project: Project) {
    this.projectModel = this.projects.find(x => x.project_id == project.project_id);
    this.AddButton = "Update";
    var x = this.users.find(x => x.user_id == project.user_id);
    if (x != null)
      $("#manager").val(x.first_name + " " + x.last_name);
  }

  SuspendProject(project: Project) {
    this.selectedProject = this.projects.find(x => x.project_id == project.project_id);
    this.selectedProject.suspended = true;
    this._projectService.UpdateProject(this.selectedProject).subscribe(
      (data) => { this.ngOnInit, alert('Project suspended successfully') });
  }

  SortByStartDate() {
    if (this.startDateAsc) {
      this.projects = this.projects.sort(function (x, y) { return x.start_date < y.start_date ? -1 : 1 });
      this.startDateAsc = false;
    }
    else {
      this.projects = this.projects.sort(function (x, y) { return y.start_date < x.start_date ? -1 : 1 });
      this.startDateAsc = true;
    }
  }
  SortByEndDate() {
    if (this.endDateAsc) {
      this.projects = this.projects.sort(function (x, y) { return x.end_date < y.end_date ? -1 : 1 });
      this.endDateAsc = false;
    }
    else {
      this.projects = this.projects.sort(function (x, y) { return y.end_date < x.end_date ? -1 : 1 });
      this.endDateAsc = true;
    }
  }

  SortByPriority() {
    if (this.priorityAsc) {
      this.projects = this.projects.sort(function (x, y) { return x.priority - y.priority });
      this.priorityAsc = false;
    }
    else {
      this.projects = this.projects.sort(function (x, y) { return y.priority - x.priority });
      this.priorityAsc = true;
    }
  }
  SortByStatus() {
    if (this.completedAsc) {
      this.projects = this.projects.sort(function (x, y) { return x.suspended < y.suspended ? -1 : 1 });
      this.completedAsc = false;
    }
    else {
      this.projects = this.projects.sort(function (x, y) { return y.suspended < x.suspended ? -1 : 1 });
      this.completedAsc = true;
    }
  }
}
