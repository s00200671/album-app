import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumAPIService } from 'src/app/services/album-api.service';
import { Comment } from "../../interfaces/comment";
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {


  uid: string = "";
  comments: {};
  @Input() albumID: string = "";
  StructuredComments = [];

  nestedDataSource = new MatTreeNestedDataSource<Comment>();

  nestedTreeControl = new NestedTreeControl<Comment>(node => node.childComments);

  //nestedTreeControl = new NestedTreeControl<Comment>(node => node.childComments);

  constructor(
    private albumAPIService: AlbumAPIService,
    public dialog: MatDialog,
    private router: Router,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    this.GetComments(this.albumID);
    this.afAuth.authState.subscribe(user => { console.log(user); this.uid = user?.uid; console.log(this.uid) });
  }

  GetComments(id: string) {
    this.albumAPIService.GetCommentsForAlbum(id)
      .subscribe({

        next: (resp) => {
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
    let structuredComments = [];

    // Structure comments into tree
    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      obj["id"] = id;

      for (let childid in unstructuredComments) {
        if (!unstructuredComments.hasOwnProperty(childid)) continue;
        let obj2 = unstructuredComments[childid];
        obj2["id"] = childid;
        if (obj2.parentComment == id) {
          obj.childComments ? obj.childComments.push(obj2) : obj.childComments = [obj2]};
      }
    }

    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      !obj.parentComment && structuredComments.push({id: id, ...obj});

    } 

    this.nestedDataSource.data = structuredComments;
    structuredComments.forEach(c => console.log(c));
    console.log(structuredComments,this.nestedDataSource.data);
  }

  hasNestedChild(index: number, node: Comment) {
    return node?.childComments?.length > 0;
  }

  addNewComment(comment: Comment) {
    console.log(comment);
    const dialogRef = this.dialog.open(CommentComponent, {
      width: "auto",
      data: {
        comment: comment,
        album: this.albumID
      }
    });
  }

  RemoveComment(comment: Comment) {
    if(this.uid == comment.postedBy)
    this.albumAPIService.RemoveComment(this.albumID, comment?.id)
    .subscribe( val => {
      val && this.ngOnInit();
    });
  }
}