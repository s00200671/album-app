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
    // Structure the object into an array of structured objects
    let unstructuredComments = this.comments;
    console.log(unstructuredComments, this.comments);
    let structuredComments = [];

    // get the id for each comment
    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      obj["id"] = id;

      // loop through comments, see if the parentComment id matches the outer loop comment
      // if true, set the inner loop comment to be a child comment of outer loop comment
      for (let childid in unstructuredComments) {
        if (!unstructuredComments.hasOwnProperty(childid)) continue;
        let obj2 = unstructuredComments[childid];
        obj2["id"] = childid;
        if (obj2.parentComment == id) {
          obj.childComments ? obj.childComments.push(obj2) : obj.childComments = [obj2]};
      }
    }

    // if the comments in the unstructured comments has no parentComment id, then it
    // is clearly a base comment. This means we only add the base comments to the array
    // as we dont want to display multiple of the same commnets on the wrong node level
    for (let id in unstructuredComments) {
      if (!unstructuredComments.hasOwnProperty(id)) continue;
      let obj = unstructuredComments[id];
      !obj.parentComment && structuredComments.push({id: id, ...obj});

    } 

    // sed the tree data source to the structured comments
    // material will then populate the tree with this new data
    this.nestedDataSource.data = structuredComments;
    structuredComments.forEach(c => console.log(c));
    console.log(structuredComments,this.nestedDataSource.data);
  }

  hasNestedChild(index: number, node: Comment) {
    return node?.childComments?.length > 0;
  }

  addNewComment(comment: Comment) {
    // open comment dialog to save comment
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