import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";


export class PostsController extends BaseController{
  constructor(){
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .get('/:postId', this.getPostById)
      .get('/:postId/comments', this.getPostComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .put('/:postId', this.editPost)
      .delete('/:postId', this.deletePost)
  }

  async getPosts(req, res, next){
    try {
      let posts = await postsService.getPosts()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPostComments(req, res, next){
    try {
      let postId = req.params.postId
      let comments = await commentsService.getPostComments(postId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(req, res, next){
    try {
      let post = await postsService.getPostById(req.params.postId)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next){
    try {
      let postData = req.body
      postData.creatorId = req.userInfo.id 
      let post = await postsService.createPost(postData)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next){
    try {
      let postData = req.body
      let post = await postsService.editPost(req.params.postId, postData)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next){
    try {
      let post = await postsService.deletePost(req.params.postId)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}