import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from '../Models/Task';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  tasks: Task[];
  taskFilter: Task[];
  task: Task;
  startDateAsc: boolean = true;
  endDateAsc: boolean = true;
  completedAsc: boolean = true;
  priorityAsc: boolean = true;
  constructor(private _router: Router, private _viewTaskService: ManagementService) { }

  ngOnInit() {
    this.GetAllTask();
  }

  GetAllTask() {
    this._viewTaskService.GetAllTasks().subscribe((data: Task[]) => { this.taskFilter = data, this.tasks = data });
  }

  FilterTask(searchText: string) {
    if (searchText == '')
      this.GetAllTask();
    else {
      this.tasks = this.taskFilter.filter(x => x.task1.toLowerCase().indexOf(searchText.toLowerCase()) > 0);
    }
  }
  SortByStartDate() {
    if (this.startDateAsc) {
      this.tasks = this.tasks.sort(function (x, y) { return x.start_date < y.start_date ? -1 : 1 });
      this.startDateAsc = false;
    }
    else {
      this.tasks = this.tasks.sort(function (x, y) { return y.start_date < x.start_date ? -1 : 1 });
      this.startDateAsc = true;
    }
  }
  SortByEndDate() {
    if (this.endDateAsc) {
      this.tasks = this.tasks.sort(function (x, y) { return x.end_date < y.end_date ? -1 : 1 });
      this.endDateAsc = false;
    }
    else {
      this.tasks = this.tasks.sort(function (x, y) { return y.end_date < x.end_date ? -1 : 1 });
      this.endDateAsc = true;
    }
  }

  SortByPriority() {
    if (this.priorityAsc) {
      this.tasks = this.tasks.sort(function (x, y) { return x.priority - y.priority });
      this.priorityAsc = false;
    }
    else {
      this.tasks = this.tasks.sort(function (x, y) { return y.priority - x.priority });
      this.priorityAsc = true;
    }
  }
  SortByStatus() {
    if (this.completedAsc) {
      this.tasks = this.tasks.sort(function (x, y) { return x.status < y.status ? -1 : 1 });
      this.completedAsc = false;
    }
    else {
      this.tasks = this.tasks.sort(function (x, y) { return y.status < x.status ? -1 : 1 });
      this.completedAsc = true;
    }
  }
  EditTask(task: Task) {
    this._router.navigate(['/EditTask/' + task.task_id]);
  }
  EndTask(task: Task) {
    task.status = "completed";
    this._viewTaskService.UpdateTask(task).subscribe(
      (data) => { this.ngOnInit, alert('task updated successfully') }
    );
  }
}
