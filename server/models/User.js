import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  userName: {type: String, require: true, unique: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  profilePic: {type: String, default: ""},
  isAdmin: {type: Boolean, default: false},
}, {
  timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);
export default UserModel