import mongoose from "mongoose";

const Schema = mongoose.Schema

// NOTE copied from Post
const like = new Schema({
  value: {type: Number, min:-1, max:1},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
})

like.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

export const CommentSchema = new Schema(
  {
    body: {type: String, required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    likes: [like]
  },
  {timestamps: true, toJSON: {virtuals: true}}
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

