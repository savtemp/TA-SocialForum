import mongoose from "mongoose";

const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    creator: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    // profile picture
  },
  {timestamps: true, toJSON: {virtuals:true}}
)