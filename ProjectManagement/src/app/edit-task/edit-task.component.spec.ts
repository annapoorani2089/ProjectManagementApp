import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskComponent } from './edit-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagementService } from '../management.service';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBackend } from '@angular/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
declare var $: any;

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskComponent ],
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, HttpModule],
      providers: [ManagementService, { provide: HttpClient, deps: MockBackend }]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
