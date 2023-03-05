import Router from 'express'
import { MovieModel } from '../models/index.js'
import verify from '../verifyToken.js'

const movieRouter = Router()

// create new movies
movieRouter.post('/', verify, async (req, res) => {
  if(req.user.isAdmin){
    const newMovie = new MovieModel(req.body);
    try {
      const savedMoive = await newMovie.save()
      res.status(201).json(savedMoive);
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 
// update movie
movieRouter.put('/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 

// delete movie
movieRouter.delete('/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      await MovieModel.findByIdAndDelete(req.params.id)
      res.status(200).json("Xóa thành công");
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 
// get movie
movieRouter.get('/find/:id', verify, async (req, res) => {
  try {
    const movie = await MovieModel.findById(req.params.id)
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
}) 

// get random movie
movieRouter.get('/random', verify, async (req, res) => {
  const type = req.query.type
  let movie;
  try {
    if(type === "series"){
      movie = await MovieModel.aggregate([
        { $match: { isSeries: true}},
        { $sample: { size: 1}}
      ])
    }else{
      movie = await MovieModel.aggregate([
        { $match: { isSeries: false}},
        { $sample: { size: 1}}
      ])
    }
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err);
  }
}) 
// get all movie
movieRouter.get('/', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const movies = await MovieModel.find()
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 

export default movieRouter