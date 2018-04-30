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
  async put (req,res) {
    try {
      user = await User.findOneAndUpdate({_id: req.userId},req.body,{new:true})
      user.password = undefined
      res.send(user)
    } catch (err) {
      res.send(err)
    }
  },
  async delete (req, res) {
    try {
      cb = await User.deleteOne({_id: req.userId})
      res.send(cb)
    } catch (err) {
      res.send(err)
    }
  }
}