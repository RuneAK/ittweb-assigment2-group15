import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  Workout:any

  constructor(private apiService:ApiService) { 
    this.getWorkout();
  }

  ngOnInit() {
  }

  getWorkout(){
    this.apiService.show(this.apiService.currentWorkout).subscribe((data) => {
      this.Workout = data['workout'];
      console.log(this.Workout)})
  }
}
