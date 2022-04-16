// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router, UrlSerializer } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlbumAPIService } from './album-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data
  loggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public albumAPIService: AlbumAPIService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(
          `users/${user.uid}`
        );

        let userdata;

        userRef.get().subscribe(u => {
          userdata = u.data();
          console.log("user from fb", userdata);
          this.userData = userdata;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
          this.loggedin.next(true);
        });
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        console.log("Signin", result.user);
        this.SetUserData(result.user);
        this.loggedin.next(true);
      })
      .catch((error) => {
        return error.message;
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      })
      .catch((error) => {
        return error.message;
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log("Ser user", user);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      favourites: user.favourites || []
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SetFavs(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${this.userData.uid}`
    );
    console.log("Set favs", user)
    const userData: any = {
      favourites: user.favourites
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
      this.loggedin.next(false);
    });
  }

  AddFavourite(id: string) {
    let user = this.userData.favourites || [];
    user.push(id);
    console.log(user);
    this.SetFavs({ favourites: user })
      .then(val => {
        this.userData.favourites = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.albumAPIService.UpdateAlbum(id, 1).subscribe(v => console.log(v));
      });
  }

  RemoveFavourite(id: string) {
    console.log(id);
    let user = this.userData.favourites || [];
    console.log(user);
    console.log(user.indexOf(id));
    if (user.length && user.indexOf(id) > -1) {
      let i = user.indexOf(id);
      user.splice(i, 1);
    }
    console.log(user);
    this.SetFavs({ favourites: user })
      .then(val => {
        this.userData.favourites = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.albumAPIService.UpdateAlbum(id, -1).subscribe(v => console.log(v));
      });
  }

  // // Get the user value from the behaviour subject
  // public get userValue(): User | null {
  //   return this.userSubject.value;
  // }

  // constructor(
  //   private http: HttpClient) {
  //   this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  //   this.user = this.userSubject.asObservable();
  //   console.log(this.userSubject, this.user);
  // }

  // IsLoggedIn(): boolean {
  //   if (this.userValue == null) return false;
  //   return !(Object.keys(this.userValue).length === 0);
  // }

  // Logout(): boolean {
  //   return true;
  // }
}
