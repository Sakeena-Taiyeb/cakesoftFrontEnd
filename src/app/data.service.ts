import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import{HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import{Todo} from '../app/model/todo.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }
  
  //Add the error handler function.
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  //Add a function for extract response data.
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  //list Todo
  getTodo(): Observable<Todo[]> {
  return this.http.get<Todo[]>(this.API_URL,httpOptions).pipe(
  catchError(this.handleError));
  }
  //Add Todo
  addTodo(title,description){
    const obj = {
      title: title,
      description: description,
     status:'status',
     date:new Date()
    };
    this.http.post(`${this.API_URL}/add`, obj).pipe(
      map(this.extractData),
      catchError(this.handleError))
        .subscribe(res => console.log('Done'));
  }
//update TodoProperty
// updateTodoProperty(){
//   return 
//   console.log('Inside Update Property')}

  

  //updateTodo
  updateTodo(todo,id){
    console.log('inside service');
    return this.http.put(`${this.API_URL}/update/${id}`,todo).pipe(
      map(this.extractData),catchError(this.handleError));

  }
  //delete Todo
  delete(id){
   
      return this.http
      .delete( `${this.API_URL}/delete/${id}`).pipe(map (this.extractData),catchError(this.handleError));
      
    
  }
}
