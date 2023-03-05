import Router from 'express'
import { UserModel } from '../models/index.js'
import CryptoJS from 'crypto-js'
import verify from '../verifyToken.js'

const userRouter = Router()

// update user
userRouter.put('/:id', verify, async (req, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn chỉ có thể chỉnh sửa thông tin của chính mình!")
  )
}) 
// delete user
userRouter.delete('/:id', verify, async (req, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin){
    try {
      await UserModel.findByIdAndDelete(req.params.id)
      res.status(200).json("Xóa thành công!");
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Bạn chỉ có xóa tài khoản của chính mình!")
  )
}) 
// get user
userRouter.get('/find/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    const { password, ...info } = user._doc
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
}) 
// getall user
userRouter.get('/', verify, async (req, res) => {
  const query = req.query.new;
  if(req.user.isAdmin){
    try {
      const users = query ? await UserModel.find().sort({_id: -1}).limit(10) : await UserModel.find()
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }else(
    res.status(403).json("Chỉ có admin mới có thể xem được tất cả user!")
  )
}) 
// get user stats
userRouter.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await UserModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

export default userRouter