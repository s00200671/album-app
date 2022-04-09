import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Privare user behavioir subject to enter data to and get the value
  private userSubject: BehaviorSubject<User | null>;
  // Use for subscribing
  public user: Observable<User | null>;

  // Get the user value from the behaviour subject
  public get userValue(): User | null {
    return this.userSubject.value;
  }

  constructor(
    private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.user = this.userSubject.asObservable();
    console.log(this.userSubject, this.user);
  }

  IsLoggedIn(): boolean {
    if (this.userValue == null) return false;
    return !(Object.keys(this.userValue).length === 0);
  }

  Logout(): boolean {
    return true;
  }
}
