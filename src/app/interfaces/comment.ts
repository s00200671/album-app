export interface Comment {
    id: string,
    commentText: string,
    postedBy: string,
    time: Date,
    parentComment: string,
    childComments: [Comment]
}
