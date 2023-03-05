import Router from 'express'
import { ListModel } from '../models/index.js'
import verify from '../verifyToken.js'

const listRouter = Router()

// create list movies
listRouter.post('/', verify, async (req, res) => {
  if(req.user.isAdmin){
    const newList = new ListModel(req.body);
    try {
      const savedList = await newList.save()
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 

// delete list movies
listRouter.delete('/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      await ListModel.findByIdAndDelete(req.params.id)
      res.status(201).json("Xóa danh sách thành công!");
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn cần quyền admin!")
  )
}) 

// get list movies
listRouter.get('/', verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await ListModel.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await ListModel.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default listRouter