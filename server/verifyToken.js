import jwt from 'jsonwebtoken'

const verify = (req, res, next) => {
  const authheader  = req.headers.token
  if(authheader){
    const token = authheader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if(err) return res.status(403).json("token invalid");
      req.user = user
      next()
    })
  }else{
    res.status(401).json("Unauthoried")
  }
}

export default verify