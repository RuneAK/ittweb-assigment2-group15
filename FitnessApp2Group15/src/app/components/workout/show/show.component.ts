import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'set', 'reps_time'];
  Workout:any
  exercies:any

  constructor(public apiService:ApiService, private router: Router, private ngZone: NgZone) { 
    this.getWorkout();
    this.apiService.isLoggedIn();
  }

  ngOnInit() {
  }

  isSameUser():boolean{
    return this.apiService.isSameUser(this.Workout.user);
  }

  getWorkout(){
    this.apiService.show(this.apiService.currentWorkout).subscribe((data) => {
      this.Workout = data['workout'];
      this.exercies = this.Workout['exercises'];
    });
  }

  addExercise(){
    this.apiService.currentWorkout = this.Workout._id;
    this.ngZone.run(() => this.router.navigateByUrl('/addExercise'))
  }
}
