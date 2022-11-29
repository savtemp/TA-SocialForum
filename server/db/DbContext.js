import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PostSchema } from '../models/Post.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Posts = mongoose.model('Post', PostSchema)

  // Comment =

  // Like = 
}

export const dbContext = new DbContext()
