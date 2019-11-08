import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, public fb: FormBuilder, private router: Router, private ngZone: NgZone,) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
   };

  ngOnInit() {
  }

  get myForm(){
    return this.registerForm.controls;
  }

  register(){
    this.submitted = true;
    if (!this.registerForm.valid) {
      return false;
    } else {
      this.apiService.register(this.registerForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/login'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
