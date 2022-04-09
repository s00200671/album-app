import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  message: String = "";
  
  constructor(
    private router: Router,
    private authService: AuthService
    ) {  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    });
  }

  onSubmit() {
    this.authService.SignIn(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
    .then(val => val && (this.message = "Error logging in, check email and/or password"))
  }

  dismissAlert() {
      this.message = "";
  }
}
