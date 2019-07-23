import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

//import { GridDataResult } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    ListTodoComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,HttpClientModule,Ng2SmartTableModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
