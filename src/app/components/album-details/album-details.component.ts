import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/interfaces/album';
import { User } from 'src/app/interfaces/user';
import { AlbumAPIService } from 'src/app/services/album-api.service'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  user: User;
  favourite: boolean = false;
  favNo: number = 0;

  constructor(
    private route: ActivatedRoute,
    private albumAPIService: AlbumAPIService,
    private authService: AuthService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum() {
    // get the id from the params 
    // then call API with service
    const id = this.route.snapshot.paramMap.get('id');
    this.albumAPIService.GetAlbumByID(id)
      .subscribe(val => {
        this.album = val as Album;
        console.log(id, this.album, val);
        this.authService.loggedin.subscribe(v => {
          if(v) { 
            this.user = this.authService.userData;
            this.favNo = this.album.favouritesNo;
            this.favourite = this.user.favourites?.includes(id);
          }
        });
      });
  }

  Favourite() {
    // Change favourite field in firestore doc and update on html
    console.log("hi");
    if (!this.favourite) {
      this.authService.AddFavourite(this.album.id);
      this.favourite = true;
      this.favNo += 1;
    }
    else {
      this.authService.RemoveFavourite(this.album.id);
      this.favourite = false;
      this.favNo -= 1;
    };
  }
}
