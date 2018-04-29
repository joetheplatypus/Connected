const config = require('../config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  async info (req,res) {
    try {
      const user = await User.findOne({_id:req.userId}) //req.userId comes from middleware
      user.password = undefined  //do not return hashed password even when logged in
      res.send(user)
    } catch (err) {
      res.send(err)
    }
  },
  async update (req,res) {
    try {
      posts = await Post.findOneAndUpdate({_id: req.params.postId},req.body,{new:true})
      res.send(posts)
    } catch (err) {
      res.send(err)
    }
  },
  async delete (req, res) {
    try {
      cb = await Post.deleteOne({_id: req.params.postId})
      res.send(cb)
    } catch (err) {
      res.send(err)
    }
  }
}