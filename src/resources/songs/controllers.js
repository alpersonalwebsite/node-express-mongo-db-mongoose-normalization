import { toNumber } from '../../utils/helpers'
import { Song, validateSong } from './model'

export const getSongs = async (req, res) => {
  try {
    const docs = await Song.find()
      .populate('artist', 'name')
      .select('name artist')
      .limit(toNumber(req.query.limit || 40))
      .skip(toNumber(req.query.offset))

    res.status(200).json({ data: docs })
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

export const addSong = async (req, res) => {
  const { error } = validateSong(req.body)

  if (error) return res.status(400).send(error.details[0].message)

  const song = new Song({
    name: req.body.name,
    artist: req.body.artist
  })

  try {
    await song.save()
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message)
    }
  }

  res.send(song)
