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
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
