import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";


export class PostsController extends BaseController{
  constructor(){
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .get('/:postId', this.getPostById)
      // .use Auth
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