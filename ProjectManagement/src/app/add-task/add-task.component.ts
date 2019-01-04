import { Component, OnInit } from '@angular/core';
import { Task } from '../Models/Task';
import { ManagementService } from '../management.service';
import { User } from '../User';
import { Project } from '../Models/Project';
import { ParentTask } from '../Models/ParentTask';
declare var $: any;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskModel: Task;
  userModel: User;
  projectModel: Project;
  ParentTaskModel: ParentTask;
  task_id: string;
  users: User[];
  projects: Project[];
  parentTasks: ParentTask[];
  constructor(private _taskService: ManagementService) {
    this.taskModel = new Task();
    this.taskModel.Project = new Project();
    this.userModel = new User();
    this.projectModel = new Project();
    this.ParentTaskModel = new ParentTask();
  }

  ngOnInit() {
    this.userModel = new User();
    $(document).ready(function () {
      $('#parentTask').change(function () {
        if ($(this).is(":checked")) {
          $('#start_date').attr('readonly', true);
          $('#end_date').attr('readonly', true);
        }
        else {
          $('#start_date').attr('readonly', false);
          $('#end_date').attr('readonly', false);
        }
      });
    });
  }

  GetAllUsers() {
    this._taskService.GetAllUser().subscribe((data: User[]) => { this.users = data });
    this.userModel = new User();
  }

  GetAllProject() {
    this._taskService.GetAllProject().subscribe((data: Project[]) => { this.projects = data });
   this.projectModel = new Project();
  }

  GetAllParentTask() {
    this._taskService.GetAllParentTask().subscribe((data: ParentTask[]) => { this.parentTasks = data });
    this.ParentTaskModel = new ParentTask();
  }

  FilterUsers(searchText: string) {
    if (searchText == '')
      this.GetAllUsers();
    else
      this.users = this.users.filter(x => x.first_name.indexOf(searchText) > 0 || x.last_name.indexOf(searchText) > 0);
  }
  FilterProjects(searchText: string) {
    if (searchText == '')
      this.GetAllProject();
    else
      this.projects = this.projects.filter(x => x.project1.indexOf(searchText) > 0);
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


  SelectProject(project: Project) {
    this.projectModel = project;
    $("#project_name").val(project.project1);
    this.taskModel.project_id = project.project_id;
  }

  SelectTask(task: ParentTask) {
    this.ParentTaskModel = task;
    $("#parent_task").val(task.parent_task1);
    this.taskModel.parent_id = task.parent_id;
  }

  AddTask(taskModel: Task) {
    if ($('#parentTask').is(":checked")) {
      this.ParentTaskModel.parent_task1 = taskModel.task1;
      this._taskService.AddParentTask(this.ParentTaskModel).subscribe(
        (data) => { alert('task added successfully') }
      );
    }
    this._taskService.AddTask(taskModel).subscribe(
      (data) => { this.task_id = data, alert('task added successfully') }
    );
  }
}
