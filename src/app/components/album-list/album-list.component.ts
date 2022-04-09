import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/interfaces/album';
import { AlbumAPIService } from 'src/app/services/album-api.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albums: Album[] = [];
  message: string = "";

  // API
  queryParams: URLSearchParams = new URLSearchParams();

  // // MatPaginator Inputs
  // total: number = 0;
  // pageSize: number = 5;
  // pageNo: number = 0;
  // // MatPaginator Output
  // pageEvent: PageEvent;

  // FORM vars
  // showalbumForm: boolean = false;
  currentAlbum?: Album = undefined;
  // formMessage: string = "";

  constructor(
    private albumAPIService: AlbumAPIService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    // set the current album to undefined again, to make sure it doesn't carry over
    this.currentAlbum = undefined;

    // new url search params to put the query params into
    this.queryParams = new URLSearchParams();

    // sub to the query params, and map them to the url search params
    this.route.queryParamMap.subscribe({
      next: params => {
      // Get search entry string

      // test logging
      console.log(params);

      // map query to url search params
      Object.entries(params).forEach((v) => { this.queryParams.set(v[0], v[1]) });


      console.log(this.queryParams);
      // Init pages if not already
      // if (params["pageNo"] && Number.isInteger(+params["pageNo"])) {
      //   this.queryParams.set("pageNo", params["pageNo"]);
      //   this.pageNo = params["pageNo"];
      // }
      // else this.queryParams.set("pageNo", "0");

      // if (params["pageSize"] && Number.isInteger(+params["pageSize"])) {
      //   this.queryParams.set("pageSize", params["pageSize"]);
      //   this.pageSize = params["pageSize"];
      // }
      // else this.queryParams.set("pageSize", this.pageSize.toString());

      // Reset albums array, otherwise when this is called again, albums will be doubled
      this.albums = [];

      // Call API
      this.getAlbums();
    },
    error: e => console.log(e)});
  }

  // Get albums using api and generating param string
  getAlbums(): void {
    // Get the search query string
    let searchQuery = "?" + this.queryParams.toString();

    // Call the album service
    this.albumAPIService.GetAlbums(searchQuery)
      .subscribe({
        next: (resp) => {
          // init albums as new album array
          this.albums = [] as Album[];

          // get the .albums of the response
          let albums = resp['albums'];
          albums.forEach((album: Album) => this.albums.push(album as Album));

          console.log(resp);
          console.log(searchQuery);
          // replace the state of the url with the new search query.
          // NOTE: this does not refresh the page, I just want the url to match the params
          // If a user refreshes, it brings the user back to this same page. This prevents
          // them typing out or chaning paging to get back to the page
          this.location.replaceState("/albums/" + searchQuery);
        },
        complete: () => console.log('album service finished'),
        error: (mess) => this.message = mess
      });
  }

}
