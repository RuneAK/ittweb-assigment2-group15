import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activityForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['date', 'comment', 'workout'];
  activities:any = [];
  Workouts:any = [];
  WorkoutTitles:any = [];

  constructor(public apiService:ApiService, public fb: FormBuilder) {
    this.activityForm = this.fb.group({
      date: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      workout: ['', [Validators.required]],
    })
    this.getWorkouts();
    this.getActivities();
   }

  ngOnInit() {
  }

  getWorkouts(){
    this.apiService.showallWorkouts().subscribe((data) => {
      this.Workouts = data['workouts'];
      this.WorkoutTitles = data['workouts']['title'];
    }) 
  }

  getActivities(){
    this.apiService.showActivity().subscribe((data) => {
      this.activities = data['activity'];
    });
  }

  get myForm(){
    return this.activityForm.controls;
  }

  addActivity(){
    this.submitted = true;
    if (!this.activityForm.valid) {
      return false;
    } else {
      this.apiService.addActivity(this.activityForm.value).subscribe(
        (res) => {
          console.log('Activity created!')
          this.getActivities();
        }, (error) => {
          console.log(error);
        });
    }
  }
}
