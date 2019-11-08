import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, public fb: FormBuilder, private router: Router, private ngZone: NgZone) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
   };

  ngOnInit() {
  }

  get myForm(){
    return this.loginForm.controls;
  }

  login(){
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.apiService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log('User successfully logged in!')
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
