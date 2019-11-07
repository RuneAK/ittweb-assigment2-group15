import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, public fb: FormBuilder, private router: Router, private ngZone: NgZone,) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]]
    })
   }

  ngOnInit() {
  }

  get myForm(){
    return this.createForm.controls;
  }

  create(){
    this.submitted = true;
    if (!this.createForm.valid) {
      return false;
    } else {
      this.apiService.createWorkout(this.createForm.value).subscribe(
        (res) => {
          console.log(res);
          console.log('Workout successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
