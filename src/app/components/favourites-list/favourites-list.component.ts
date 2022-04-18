import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/interfaces/album';
import { AlbumAPIService } from 'src/app/services/album-api.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favourites-list',
  templateUrl: './favourites-list.component.html',
  styleUrls: ['./favourites-list.component.css']
})
export class FavouritesListComponent implements OnInit {

  albums: Album[] = [];
  message: string = "";

  constructor(
    private albumAPIService: AlbumAPIService,
    private authService: AuthService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedin.subscribe(res => {
      if (res) {
        console.log(this.authService.userData);
        this.authService.userData?.favourites?.forEach(id => {
          this.albumAPIService.GetAlbumByID(id)
          .subscribe(album => this.albums.push(album));
        });
      }
      else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
