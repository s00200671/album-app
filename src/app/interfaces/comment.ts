export interface Comment {
    _id: string,
    commentText: string,
    postedBy: string,
    time: Date,
    parentComment?: Comment,
    childComments?: Comment[]
}
