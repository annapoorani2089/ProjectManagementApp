import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, Response } from '@angular/http';
import { ManagementService } from './management.service';
import { User } from './User';
import { Task } from './Models/Task';
import { Project } from './Models/Project';

describe('ManagementService', () => {

  let service: ManagementService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule],
      providers: [ManagementService, { provide: HttpClient, deps: MockBackend }]
    });
    service = TestBed.get(ManagementService);
    http = TestBed.get(HttpTestingController);
  });



  it('Service should check with Get User details', () => {
    const testUser: User[] = [
      {
        first_name: 'annapoorani',
        last_name: 'R',
        employee_id: 123,
        user_id: 1,
        Project: null,
        Task: null,
        deleted: false,
        project_id: null,
        task_id: null
      }
    ];

    service.GetUser(1).subscribe(post => {
      expect(post.first_name).toBe(testUser.find(i => i.user_id == 1).first_name);
    });
  });
  it('Service should check with Get Task details', () => {
    const testTask: Task[] = [
      {
        parent_id: 1,
        project_id: 1,
        task1: 'test Task1',
        start_date: new Date(),
        end_date: new Date(),
        priority: 10,
        task_id: 1,
        user_id: 1,
        status: null,
        Project: null,
        parent_task: null,
        users: null
      }
    ];

    service.GetTask(1).subscribe(post => {
      expect(post.task_id).toBe(testTask.find(i => i.task_id == 1).task_id);
    });
  });
  it('Service should check with Get Project details', () => {
    const testProject: Project[] = [
      {
        project_id: 1,
        project1: 'Annapoorani',
        start_date: new Date(),
        end_date: new Date(),
        priority: 10,
        user_id: 1,
        Tasks: null,
        suspended: false
      }
    ];

    service.GetAllProject().subscribe(post => {
      expect(post.find(x => x.project_id == 1).project_id).toBe(testProject.find(i => i.project_id == 1).project_id);
    });
  });
});