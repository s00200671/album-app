import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { AlbumAPIService } from 'src/app/services/album-api.service';
import { Comment } from "../../interfaces/comment";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  comments: {};
  @Input() albumID: string = "";
  StructuredComments = {};

  nestedDataSource = new MatTreeNestedDataSource<Comment>();

  //nestedTreeControl = new NestedTreeControl<Comment>(node => node.childComments);

  constructor(
    private albumAPIService: AlbumAPIService
  ) { }

  ngOnInit(): void {
    this.GetComments(this.albumID);
  }

  GetComments(id: string) {
    this.albumAPIService.GetCommentsForAlbum(id)
      .subscribe({

        next: (resp) => {
          // init albums as new album array
          // this.comments = [];

          // get the .albums of the response
          this.comments = resp;

          console.log(resp);
          console.log(this.comments);
          this.structureComments();
        },
        complete: () => console.log('comments service finished'),
        error: (mess) => console.log(mess)
      })
  }

  structureComments() {
    let unstructuredComments = this.comments;
    console.log(unstructuredComments, this.comments);
    let structuredComments = {};

    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      for (let childid in unstructuredComments) {
        if (!unstructuredComments.hasOwnProperty(childid)) continue;
        let obj2 = unstructuredComments[childid];
        if (obj2.parentComment == id) {
          console.log("hi", obj, obj2);
        obj.childComments ? obj.childComments.push(obj2) : obj.childComments = [obj2]};
      }
    }

    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      obj.parentComment && delete unstructuredComments[id];
    }

    // for (let id in unstructuredComments) {
    //   if (!unstructuredComments.hasOwnProperty(id)) continue;
    //   let obj = unstructuredComments[id];
    //   if (!obj.parentComment) {
    //     structuredComments[id] = {...obj};
    //     delete unstructuredComments[id];
    //   }
    // };
    // for (let id in unstructuredComments) {
    //   if (!unstructuredComments.hasOwnProperty(id)) continue;
    //   let obj = unstructuredComments[id];
    //   if (obj.parentComment) {
    //     structuredComments[obj.parentComment].childComments = [];
    //     structuredComments[obj.parentComment].childComments.push(obj);
    //     for (let id in unstructuredComments) {
    //       if (!unstructuredComments.hasOwnProperty(id) || obj.id == id) continue;
    //       let obj2 = unstructuredComments[obj.id];
    //       if (obj2.parentComment == obj.id) {
    //         structuredComments[obj2.parentComment].childComments = [];
    //         structuredComments[obj2.parentComment].childComments.push(obj);
    //       }
    //     }
    //   }
    // }

    this.comments = structuredComments;
    console.log(unstructuredComments);
  }
}