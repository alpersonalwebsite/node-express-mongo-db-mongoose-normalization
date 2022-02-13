import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
import mongoose from 'mongoose'

const myJoiObjectId = JoiObjectId(Joi)

const Schema = mongoose.Schema

const songSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist'
    }
  },
  { collection: 'songs' }
)

export const Song = mongoose.model('Song', songSchema)

export const validateSong = (song) => {
  const songSchema = Joi.object({
    name: Joi.string().required(),
    artist: myJoiObjectId().required()
  })

  return songSchema.validate(song)
}
