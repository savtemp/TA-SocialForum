export class Post{
  constructor(data){
    this.id = data.id,
    this.title = data.title,
    this.body = data.body,
    this.creator = data.creator,
    this.likes = data.likes
  }

  get PostTemplate(){
    return `
    <div>This is a post template</div>
    `
  }
}