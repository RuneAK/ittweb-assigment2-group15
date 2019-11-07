import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Workout } from 'src/app/model/workout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.css']
})
export class ShowallComponent implements OnInit {
  Workouts:any = [];

  constructor(private apiService:ApiService) { 
    this.getWorkouts();
   }

  ngOnInit() {
  }

  getWorkouts(){
    this.apiService.showallWorkouts().subscribe((data) => {
      this.Workouts = data['workouts'];
      console.log(this.Workouts)})
  }
}
