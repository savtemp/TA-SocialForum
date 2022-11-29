import mongoose from "mongoose";

const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    title: {type: String, required: true},
    body: {type: String, required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true}
    // profile picture
  },
  {timestamps: true, toJSON: {virtuals:true}}
)

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})