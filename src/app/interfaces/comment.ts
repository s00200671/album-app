export interface Comment {
    id?: string,
    commentText: string,
    postedBy: string,
    time: number,
    parentComment?: string,
    childComments?: [Comment]
}
