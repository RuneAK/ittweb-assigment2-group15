import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public currentWorkout: string;
  private token: string;
  baseUri:string = "";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if(token){
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      let user = JSON.parse(payload);
      return (user.exp > Date.now() / 1000);
    }
    return false;
  }

  private getUserId(){
    const token = this.getToken();
    let payload = token.split('.')[1];
    payload = window.atob(payload);
    let user = JSON.parse(payload);
    return user.id;
  }

  public isSameUser(id):boolean{
    let userid = this.getUserId();
    if(id == userid ){
      return true;
    } else {
      return false;
    }
  }

  register(data): Observable<any> {
    let url = `${this.baseUri}/user/register`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt))
  }

  login(data): Observable<any> {
    let url = `${this.baseUri}/user/login`;
     return this.http.post(url, data).pipe(map((res: any) =>{
      if(res){
        if(res.token){
          localStorage.setItem('token', res.token);
          this.token = res.token;
        }
      }
    } ))
  }

  logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
  }

  createWorkout(data): Observable<any> {
    let url = `${this.baseUri}/workout/create`;
    return this.http.post(url, data, { headers: { Authorization: `Bearer ${this.getToken()}` }}).pipe(
      catchError(this.errorMgmt))
  }

  showallWorkouts() {
    let url = `${this.baseUri}/workout/showall`;
    return this.http.get(url);
  }

  show(id){
    let url = `${this.baseUri}/workout/show/${id}`;
    return this.http.get(url);
  }

  addExercise(data){
    let url= `${this.baseUri}/workout/addExercise/${this.currentWorkout}`;
    return this.http.post(url, data, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  showActivity(){
    let url= `${this.baseUri}/activity/show`;
    return this.http.get(url, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  addActivity(data){
    let url= `${this.baseUri}/activity/add`;
    console.log('Posting'+ url);
    return this.http.post(url, data, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
