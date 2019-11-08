import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  exerciseForm:FormGroup;
  submitted=false;

  constructor(public apiService:ApiService, public fb: FormBuilder, private router: Router, private ngZone: NgZone) {
    this.exerciseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      set: ['', [Validators.required]],
      reps_time: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }

  get myForm(){
    return this.exerciseForm.controls;
  }

  addExercise(){
    this.submitted = true;
    if (!this.exerciseForm.valid) {
      return false;
    } else {
      this.apiService.addExercise(this.exerciseForm.value).subscribe(
        (res) => {
          console.log('Exercise created!')
          this.ngZone.run(() => this.router.navigateByUrl('/show'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
