import mongoose from "mongoose";

const Schema = mongoose.Schema

// NOTE this is what we did in the last project - is there a better place this can go? Should it be in it's own Schema
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

export const PostSchema = new Schema(
  {
    title: {type: String, required: true},
    body: {type: String, required: true},
    // NOTE SchemaType is a configuration object (??) for mongoose. Doesn't actually create MongoDB objectId's, its a configuration for a path in a schema
    // objectId is something that mongoDB creates, Schema.Type is grabbing the id (the objectId that mongoDB creates) and tacking it on to the Id that we are giving the child
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    likes: [like]
  },
  {timestamps: true, toJSON: {virtuals:true}}
)

// NOTE VIRTUALS
// virtuals are defined in schemas, additional fields for a given model
// a virtual is a property that is not stored in MongoDB, they do not get persisted in the DB (does not have an underlying value, they only exist logically). Typically used for computed properties
// virtuals are able to reach into another class and grab information to connect another class

// NOTE REF. FOREIGN FIELD, LOCAL FIELD
// tells mongoose which model to to populate from 
// mongoose will populate from the model in ref whose foreignField matches the localField

PostSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})