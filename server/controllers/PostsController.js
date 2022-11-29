import { postsService } from "../services/PostsService.js";
import BaseController from "../utils/BaseController.js";


export class PostsController extends BaseController{
  constructor(){
    super('api/posts')
    this.router
      .get('', this.getPosts)
      .get('/:postId', this.getPostById)
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

  async createPost(req, res, next){}

  async editPost(req, res, next){}

  async deletePost(req, res, next){}
}