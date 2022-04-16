import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  
  message: string = "";
  registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    password: new FormControl("", [Validators.required])
  }); 
  
  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn && this.router.navigate(['']);
    // New formgroup modelling the recipe interface
  }

  onSubmit() {
    // Attempts to create a user and then navigate to login
    this.authService.SignUp(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value)
    .then(val => val && (this.message = "Error signing up"))
  }

  dismissAlert() {
    this.message = "";
  }
}
