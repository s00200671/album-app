import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from 'src/app/interfaces/rating';
import { AlbumAPIService } from 'src/app/services/album-api.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {


  @Input() uid;
  @Input() albumid;

  stars: Rating[];
  avgRating: any;

  constructor(private albumAPIService: AlbumAPIService) { }

  ngOnInit() {
    // get the ratings and generate the average
    this.albumAPIService.GetRatings(this.albumid)
      .subscribe(r => {
        console.log(r);
        this.stars = r["ratings"];

        this.stars ? this.avgRating = this.stars.map(s => s.rating).reduce((p, c) => p + c, 0) / this.stars.length : "Not reviewed";

        console.log("stars", this.stars, "rating", this.avgRating);
      });
  }

  SetRating(value) {
    // set a rating
    console.log("hello", value);
    this.albumAPIService.AddRating({ uid: this.uid, albumid: this.albumid, rating: value })
      .subscribe(v => console.log(v));
  }

}
