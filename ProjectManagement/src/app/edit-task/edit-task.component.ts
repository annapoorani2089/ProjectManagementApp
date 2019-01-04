import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManagementService } from '../management.service';
import { Task } from '../Models/Task';
import { User } from '../User';
import { Project } from '../Models/Project';
import { ParentTask } from '../Models/ParentTask';
declare var $: any;
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskModel: Task;
  userModel: User;
  projectModel: Project;
  ParentTaskModel: ParentTask;
  task_id: string;
  users: User[];
  projects: Project[];
  parentTasks: ParentTask[];
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _taskService: ManagementService) {
    this.taskModel = new Task();
    this._activatedRoute.params.subscribe(param => {
      this._taskService.GetTask(param['id'])
        .subscribe((data: Task) => { this.taskModel = data })
    })

    this.userModel = new User();
    this.ParentTaskModel = new ParentTask();
    console.log(this.taskModel);
  }

  ngOnInit() {
  }
  GetAllUsers() {
    this._taskService.GetAllUser().subscribe((data: User[]) => { this.users = data });
    this.userModel = new User();
  }
  GetAllParentTask() {
    this._taskService.GetAllParentTask().subscribe((data: ParentTask[]) => { this.parentTasks = data });
    this.ParentTaskModel = new ParentTask();
  }

  SetStartDate(startdate: any) {
    this.taskModel.start_date = startdate;
  }
  SetEndDate(endDate: any) {
    this.taskModel.end_date = endDate;
  }
  FilterUsers(searchText: string) {
    if (searchText == '')
      this.GetAllUsers();
    else
      this.users = this.users.filter(x => x.first_name.indexOf(searchText) > 0 || x.last_name.indexOf(searchText) > 0);
  }
  FilterParentTask(searchText: string) {
    if (searchText == '')
      this.GetAllParentTask();
    else
      this.parentTasks = this.parentTasks.filter(x => x.parent_task1.indexOf(searchText) > 0);
  }
  SelectUser(user: User) {
    this.userModel = user;
    $("#user_name").val(user.first_name + " " + user.last_name);
    this.taskModel.user_id = user.user_id;
  }
  SelectTask(task: ParentTask) {
    this.ParentTaskModel = task;
    $("#parent_task").val(task.parent_task1);
    this.taskModel.parent_id = task.parent_id;
  }

  ValidateForm(taskModel: Task): boolean {
    if ($('#end_date').val() < $('#start_date').val()) {
      alert('Start Date must be less than End Date');
      return false;
    }
    if ($('#start_date').val() == '') {
      alert("End date is required");
      return false;
    }
    alert($('#task_name').val())
    if ($('#task_name').val() == '') {
      alert("Task Name is required");
      return false;
    }
    if ($('#end_date').val() == '') {
      alert("End date is required");
      return false;
    }
    if ($('#user_name').val() == '') {
      alert("User is required");
      return false;
    }
    return true;
  }

  UpdateTask(taskModel: Task) {
    if (!this.ValidateForm(taskModel))
      return;
    this._taskService.UpdateTask(taskModel).subscribe(
      (data) => { this.task_id = data, alert('task updated successfully') }
    );
  }
  RemoveTask(task: ParentTask) {
    this.ParentTaskModel = task;
    $("#parent_task").val('');
    this.taskModel.parent_task = null;
    this.taskModel.parent_id = null;
  }
}
