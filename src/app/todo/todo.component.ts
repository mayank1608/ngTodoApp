import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  catId:string;
  todosList:Array<object>;
  newTodoName:string;
  todoId:string;
  dataStatus:string='Add';
  constructor(private todoService:TodoService, private ar:ActivatedRoute) { }

  ngOnInit(): void {
    this.catId = this.ar.snapshot.paramMap.get("id");
    // console.log(this.catId);
    this.todoService.getTodo(this.catId).subscribe(
      data => {
        this.todosList = data;
        // console.log(this.todosList);
      }
    )
  }

  onSubmit(t:NgForm){

    if(this.dataStatus == 'Add'){
      let todoData = {
        todo : t.value.todoText,
        isCompleted : false
      }
  
      // this.todo = t.value.todoText;
      // console.log(todoData);
      this.todoService.saveTodo(this.catId, todoData);    
      t.resetForm();
    }
    else if(this.dataStatus == 'Edit'){
      this.todoService.updateTodo(this.catId, this.todoId, t.value.todoText);
      t.resetForm();
      this.dataStatus='Add';
    }

    
  }

  onEdit(id:string, todoName:string){
    // console.log(id, todoName);    
    this.newTodoName = todoName;    
    this.todoId = id;
    this.dataStatus = 'Edit'
  }

  onDelete(todoId:string){
    // this.catId = catId;
    this.todoService.deleteTodo(this.catId, todoId);
  }

  onComplete(todoId:string){    
    this.todoService.markComplete(this.catId, todoId);
  }

  onIncomplete(todoId:string){    
    this.todoService.markUncomplete(this.catId, todoId);
  }
}
