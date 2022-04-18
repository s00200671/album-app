import { Component, Inject, Input, OnInit } from '@angular/core';
import { AlbumAPIService } from 'src/app/services/album-api.service';
import { Comment } from "../../interfaces/comment";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  message: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private albumAPIService: AlbumAPIService,
    private dialogRef: MatDialogRef<CommentComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveComment(text: string) {
    if (this.authService.isLoggedIn && text) {
      console.log(this.data)
      let comment = {
        commentText: text,
        parentComment: this.data.comment?.id,
        postedBy: this.authService.userData.uid,
        time: Date.now()
      }
      try {
        this.albumAPIService.AddComment(this.data.album, comment)
          .subscribe(val => {
            let route = this.router.url;
            val ? this.dialogRef.close() : this.message = "Error posting comment";
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([`/albums/${this.data.album}`]);
              });
          })
      } catch {
        this.message = "Error posting comment";
      }
    }
    else {
      this.message = "You must be logged in to comment!";
    }
  }

}
