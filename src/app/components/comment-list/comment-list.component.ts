import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AlbumAPIService } from 'src/app/services/album-api.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: Comment[] = [];
  albumID: string = "";

  nestedDataSource = new MatTreeNestedDataSource<Comment>();

  //nestedTreeControl = new NestedTreeControl<Comment>(node => node.childComments);

  constructor(private albumAPIService: AlbumAPIService) { }

  ngOnInit(): void {

  }

  GetComments(id: string) {
    this.albumAPIService.GetCommentsForAlbum(this.albumID)
    .subscribe({
      
      next: (resp) => {
        // init albums as new album array
        this.comments = [];

        // get the .albums of the response
        let comments = resp["comments"];
        comments.forEach((comment: Comment) => this.comments.push(comment as Comment));

        console.log(resp);
      },
      complete: () => console.log('comments service finished'),
      error: (mess) => console.log(mess)
    })
  }
}
