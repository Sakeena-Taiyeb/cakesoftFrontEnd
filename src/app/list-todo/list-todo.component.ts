import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
//import { GridDataResult } from '@progress/kendo-angular-grid';
//import { State, process } from '@progress/kendo-data-query';

import {DataService} from '../data.service';
import {Todo} from '../model/todo.model';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  // `<ng2-smart-table [settings]="settings" [source]="todos"></ng2-smart-table>`

  styleUrls: ['./list-todo.component.css']
   
})
export class ListTodoComponent implements OnInit {
  angForm: FormGroup;
  editField: string;

  status:'';
  todos:Todo[];
  // settings = {
  //   columns: {
  //     title: {
  //       title: 'Title'
  //     },
  //     description: {
  //       title: 'Description'
  //     },
  //     status: {
  //       title: 'Status'
  //     }
     
  //   }
  // };
  constructor(private ds: DataService, private fb: FormBuilder) {
    this.createForm();

   }
   createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      description: ['', Validators.required ]
   });
  }
  

  updateTodo(todo){
    console.log(todo.title);
    this.ds.updateTodo(todo,todo._id).subscribe(res=>{
      console.log("Row Updated");
      this.getTodo();
    });
  }
  ngOnInit() {
    this.getTodo();
  }
  addTodo(title,description){
    //this.status=
this.ds.addTodo(title,description);
this.getTodo();
}
getTodo(){
  this.ds.getTodo().subscribe(res => {
    console.log(res);
    this.todos = res;
  }, err => {
    console.log(err);
  });
}// get end 
delete(id){
  this.ds.delete(id).subscribe(res=>{
    console.log(res);
    this.getTodo();
  });
}
changeStatus(status,todo){
  console.log(todo.status);
  if(todo.status==='status'){
  todo.status='Done';
  this.ds.updateTodo(todo,todo._id).subscribe(res=>{
    console.log('status Updated');
this.getTodo();
  });
}//end if
}

}//ts end


