import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/interfaces/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @Input() album!: Album;
  show: boolean = true;
  favourited: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clicked() {
    this.router.navigate([`/albums/${this.album.id}`]);
  }
}
