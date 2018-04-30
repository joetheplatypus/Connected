const User = require('../models/User')

module.exports = {
  async get (req,res) {
    try {
      user = await User.findOne({_id: req.params.userId})
      user.password = undefined
      res.send(user)
    } catch (err) {
      res.send(err)
    }
  },
  async index (req,res) {
    try {
      users = await User.find({})
      const newUsers = users.map(user => {
        user.password = undefined
        return user
      })
      res.send(newUsers)
    } catch (err) {
      res.send(err)
    }
  }
}