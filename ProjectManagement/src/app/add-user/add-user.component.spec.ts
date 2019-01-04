import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagementService } from '../management.service';
import { User } from '../User';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

class MockService extends ManagementService {

}

describe('AddUserComponent', () => {

  let service: ManagementService;
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let http: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, HttpModule],
      providers: [ManagementService, { provide: HttpClient, deps: MockBackend }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddUserComponent);
        component = fixture.debugElement.componentInstance;
      });
    http = TestBed.get(HttpTestingController);
    service = TestBed.get(ManagementService);
  }));

  /*it('should get all users', () => {
    const x = component.GetAllUser();
    expect(x).toBeTruthy();
  });*/

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.debugElement.componentInstance;
    component = new AddUserComponent(service);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('check user details', () => {
    const mgmtService = fixture.debugElement.injector.get(ManagementService);

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
    mgmtService.GetAllUser();
    //expect(mgmtService.GetAllUser()).toBeTruthy();
    const el = fixture.nativeElement.querySelector('tbody');
    console.log(el);
    //expect(component.GetAllUser()).toBeTruthy();
    //  let users = component.users;
    //expect(component.users.length).toBeGreaterThan(1);
    //  expect(mgmtService.GetAllUser().subscribe((data) => data)).toEqual(component.GetAllUsers());

    // let res = component.GetAllUsers();
    //console.log(res=>res.find(x => x.user_id == 1).first_name);
    //expect(res => res.find(x => x.user_id == 1).first_name).toBe(testUser.find(i => i.user_id == 1).first_name);
  });

});
