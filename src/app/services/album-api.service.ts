import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumAPIService {

  readonly ALBUM_API: string = environment.BASE_API + "/albums";
  readonly COMMENT_API: string = environment.BASE_API + "/comments";

  constructor(private http: HttpClient) { }

  GetAlbums(search: string): Observable<Album[]> {
    // Get Albums based off of search string
    console.log("GetAlbums called");

    if (search == "") {
      return this.http.get<Album[]>(`${this.ALBUM_API}`)
        .pipe(catchError(this.handleError));
    }
    else {
      return this.http.get<Album[]>(`${this.ALBUM_API}` + search)
        .pipe(catchError(this.handleError));
    }
  }

  GetAlbumByID(id: string): Observable<Album> {
    // Get individual Albums by their id
    console.log("GetAlbumByID called");

    return this.http.get<Album>(`${this.ALBUM_API}/${id}`);
  }
  
  GetCommentsForAlbum(id: string): Observable<Comment> {
    // Get individual Albums by their id
    console.log("GetCommentsForAlbum called");

    return this.http.get<Comment>(`${this.COMMENT_API}/${id}`);
  }

  AddComment(id: string, comment: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.COMMENT_API}/${id}`, comment);
  }

  RemoveComment(id: string, commentid: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.COMMENT_API}/${id}/${commentid}`)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client side error
      console.error("An error occured: ", error.error.message);
    }
    else {
      // Backend response
      console.error("Returned code: " + error.status + " Error: " + error.error);
    }
    return throwError("Something bad happened, please try again later");
  }
}
