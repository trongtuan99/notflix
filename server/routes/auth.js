import Router from 'express'
import { UserModel } from '../models/index.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

const authRouter = Router();
// register
authRouter.post('/register', async (req, res) => {
  const newUser = new UserModel({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
  })

  try{
    const user = await newUser.save()
    res.status(201).json(user)
  }catch(err){
    res.status(500).json(err)
  }
})

// login
authRouter.post('/login', async(req, res) => {
  try{
    const findUser = await UserModel.findOne({email: req.body.email});

    !findUser && res.status(401).json("Tài khoản hoặc mật khẩu không chính xác!")

    const bytes = CryptoJS.AES.decrypt(findUser.password, process.env.SECRET_KEY)
    const originalPass = bytes.toString(CryptoJS.enc.Utf8);

    originalPass !== req.body.password && res.status(401).json("Tài khoản hoặc mật khẩu không chính xác!") 
    const accessToken = jwt.sign(
      {id: findUser._id, isAdmin: findUser.isAdmin}, 
      process.env.SECRET_KEY, 
      { expiresIn: '5d'})

    const { password, ...info } = findUser._doc;
    res.status(200).json({...info, accessToken})
  }catch (err){ 
    res.status(500).json(err)
  }
})

export default authRouter
