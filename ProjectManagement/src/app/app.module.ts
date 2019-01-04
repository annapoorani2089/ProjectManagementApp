import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { MenuComponent } from './menu/menu.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { User } from './User';
import {HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
//import { observable } from 'rxjs';
import { ManagementService } from 'src/app/management.service';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    MenuComponent,
    ViewTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
