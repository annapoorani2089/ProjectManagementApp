import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Task } from './Models/Task';
import { Project } from './Models/Project';
import { ParentTask } from './Models/ParentTask';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private http: Http) { }

  //USERS 
  GetAllUser(): Observable<User[]> {
    return this.http.get("http://localhost:50051/api/Users")
      .map((response: Response) => response.json());
  }
  GetAllProject(): Observable<Project[]> {
    console.log("yes")
    return this.http.get("http://localhost:50051/api/Projects")
      .map((response: Response) => response.json());
  }
  GetAllTasks(): Observable<Task[]> {
    return this.http.get("http://localhost:50051/api/Tasks")
      .map((response: Response) => response.json());
  }
  GetAllParentTask(): Observable<ParentTask[]> {
    return this.http.get("http://localhost:50051/api/ParentTask")
      .map((response: Response) => response.json());
  }
  GetUser(id: number): Observable<User> {
    return this.http.get("http://localhost:50051/api/Users/" + id)
      .map((response: Response) => response.json());
  }
  GetTask(id: number): Observable<Task> {
    return this.http.get("http://localhost:50051/api/Tasks/" + id)
      .map((response: Response) => response.json());
  }
  UpdateUser(user: User): Observable<string> {
    var id = user.user_id;
    return this.http.put('http://localhost:50051/api/Users/' + id,
      user).map(res => res.json());
  }
  UpdateProject(project: Project): Observable<string> {
    var id = project.project_id;
    return this.http.put('http://localhost:50051/api/Projects/' + id,
    project).map(res => res.json());
  }
  UpdateTask(task: Task): Observable<string> {
    var id = task.task_id;
    return this.http.put('http://localhost:50051/api/Tasks/' + id,
    task).map(res => res.json());
  }

  DeleteUser(userId: number): Observable<string> {
    return this.http.delete("http://localhost:50051/api/Users/" + userId)
      .map((response: Response) => <string>response.json());
  }

  AddUser(user: User): Observable<string> {
    return this.http.post("http://localhost:50051/api/Users", user)
      .pipe(map((response: Response) => <string>response.json()));
  }
  AddTask(task: Task): Observable<string> {
    console.log(task);
    console.log(JSON.stringify(task));
    return this.http.post("http://localhost:50051/api/Tasks", task)
      .pipe(map((response: Response) => <string>response.json()));
  }
  AddProject(project: Project): Observable<string> {
    return this.http.post("http://localhost:50051/api/Projects", project)
      .pipe(map((response: Response) => <string>response.json()));
  }
  AddParentTask(task: ParentTask): Observable<string> {
    return this.http.post("http://localhost:50051/api/ParentTask", task)
      .pipe(map((response: Response) => <string>response.json()));
  }
}
