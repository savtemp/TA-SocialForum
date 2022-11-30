import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";


class PostsService{
  async getPosts() {
    let posts = await dbContext.Posts.find()
    return posts
  }

  async getPostById(postId) {
    let post = await dbContext.Posts.findById(postId)
    if(!post){
      throw new BadRequest(`${postId} is not a valid Post Id.` )
    }
    return post
  }

  async createPost(postData) {
    let post = await dbContext.Posts.create(postData)
    return post
  }

  async editPost(postId, postData) {
    let post = await this.getPostById(postId)

    post.title = postData.title || post.title
    post.body = postData.body || post.body

    await post.save()
    return post
  }

  async deletePost(postId) {
    let post = await this.getPostById(postId)
    await post.remove()
    return post
  }

  async likePost(postId, likeData){
    // find the post
    let post = await this.getPostById(postId)
    // once you have found the post, go through the post array and find the post where the creatorId matches the likeData creator id)
    let foundPost = post.likes.find(p => p.creatorId == likeData.creatorId)
    // if the post is found attack the like data value to the found post
    if(foundPost){
      foundPost.value = likeData.value
    } else {
      post.likes.push(likeData)
    }
    // NOTE saves the data to the DB, using this allows new data OR updated data to be added to the DB
    await post.save()
    return post
  }
}


export const postsService = new PostsService()