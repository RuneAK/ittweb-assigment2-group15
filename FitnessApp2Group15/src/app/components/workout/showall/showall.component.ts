import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.css']
})
export class ShowallComponent implements OnInit {
  displayedColumns: string[] = ['title'];
  Workouts:any = [];

  constructor(public apiService:ApiService, private router: Router, private ngZone: NgZone) {
    this.getWorkouts();
   }

  ngOnInit() {
  }

  getWorkouts(){
    this.apiService.showallWorkouts().subscribe((data) => {
      this.Workouts = data['workouts'];})
  }

  show(workout){
    this.apiService.currentWorkout = workout._id;
    this.ngZone.run(() => this.router.navigateByUrl('/show'));
  }
}
