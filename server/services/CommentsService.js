import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"


class CommentsService{
    async getPostComments(postId){
    let comment = await dbContext.Comments.find({postId}).populate('creator')
    // populating the virtual (a populated virtual contains documents from another collection) 
    return comment
  }
    async getCommentById(commentId) {
    let comment = await dbContext.Comments.findById(commentId)
    if(!comment){
      throw new BadRequest(`${commentId} is not a valid Comment Id.`)
    }
    return comment
  }
  async createComment(commentData) {
    let comment = await dbContext.Comments.create(commentData)
    return comment
  }
  async editComment(commentId, commentData) {
    let comment = await this.getCommentById(commentId)

    comment.body = commentData.body || comment.body

    await comment.save()
    return comment
  }
  async deleteComment(commentId) {
    let comment = await this.getCommentById(commentId)
    await comment.remove()
    return comment
  }
}


export const commentsService = new CommentsService()