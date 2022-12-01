import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";


export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:commentId', this.getCommentById)
      .post('', this.createComment)
      .put('/:commentId', this.editComment)
      .put('/:commentId/like', this.likeComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getCommentById(req, res, next){
    try {
      let comment = await commentsService.getCommentById(req.params.commentId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next){
    try {
      let commentData = req.body
      commentData.creatorId = req.userInfo.id
      let comment = await commentsService.createComment(commentData)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next){
    try {
      let commentData = req.body
      let comment = await commentsService.editComment(req.params.commentId, commentData)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next){
    try {
      let comment = await commentsService.deleteComment(req.params.commentId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async likeComment(req, res, next){
    try {
      let likeData = req.body
      likeData.creatorId = req.userInfo.id
      let comment = await commentsService.likeComment(req.params.commentId, likeData)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}