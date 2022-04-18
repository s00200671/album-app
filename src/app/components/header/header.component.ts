import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SearchComponent } from '../search/search.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  loggedIn: boolean = false;
  isadmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    // Get if the user is logged in by checking if the user obj has keys
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.authService.IsAdmin().then(r => this.isadmin = r);
      }
      else (this.loggedIn = false)
    });
  };

  ShowSearch() {
    const dialogRef = this.dialog.open(SearchComponent, {
      width: "80%"
    });
  }

  LogOut(): void {
    // When the log out button is pressed, log out is called from user service, then navigate to home
    this.authService.SignOut();
    this.loggedIn = false;
    this.router.navigateByUrl('sign-in', { skipLocationChange: false }).then(() => {
    });
  }
}
