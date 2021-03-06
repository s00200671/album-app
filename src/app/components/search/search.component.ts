import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //ngMdodel search in html
  search: string = "";
  timeMin: number = 0;
  timeMax: number = 0;

  // display filter ?
  showFilter: boolean = false;

  //search params
  filter: {} = {};

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<SearchComponent>) {
  }


  ngOnInit(): void { }

  searchAlbums(): void {

    this.filter = this.GetFilter();

    console.log(this.filter);
    console.log(JSON.stringify(this.filter));

    // Make sure the title has characters in it
    if (this.filter["title"] !== undefined) {
      console.log(this.filter);
      this.router.navigate(['/albums'], { queryParams: this.filter });
      this.dialogRef.close();
    }
  }

  GetFilter(): {} {
    // init the filter again, prevents carryover 
    this.filter = {};

    // get the title
    this.filter["title"] = this.search;
    if( this.filter["title"] === undefined) this.filter["title"] = "";

    return this.filter;
  }
}
