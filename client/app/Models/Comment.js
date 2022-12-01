export class Comment{
  constructor(data){
    this.id = data.id,
    this.postId = data.postId,
    this.body = data.body,
    this.creator = data.creator
    this.likes = data.likes
  }

get CommentTemplate(){
  return `
  <div>This is a comment template</div>
  `
}
}