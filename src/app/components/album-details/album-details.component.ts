import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/interfaces/album';
import { AlbumAPIService } from 'src/app/services/album-api.service'

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;

  constructor(
    private route: ActivatedRoute,
    private albumAPIService: AlbumAPIService
    ) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum() {
  const id = this.route.snapshot.paramMap.get('id');
  this.albumAPIService.GetAlbumByID(id)
  .subscribe( val => {
    this.album = val as Album;
  console.log(id, this.album, val);  
  });
}

}
