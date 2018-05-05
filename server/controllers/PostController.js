const Post = require('../models/Posts')

module.exports = {
  async post (req,res) {
    try {
      const post = await Post.create(req.body)
      if(post.userId !== req.userId) {
        throw 'cannot post as someone else'
      }
      res.send(post)
    } catch (err) {
      res.send(err)
    }
  },
  async index (req,res) {
    try {
      posts = await Post.find({})
      res.send(posts)
    } catch (err) {
      res.send(err)
    }
  },
  async get (req,res) {
    try {
      posts = await Post.findOne({_id: req.params.postId})
      res.send(posts)
    } catch (err) {
      res.send(err)
    }
  },
  async put (req,res) {
    try {
      if(req.body.userId !== req.userId) {
        throw 'cannot post as someone else'
      }
      post = await Post.findOneAndUpdate({_id: req.params.postId},req.body,{new:true})
      res.send(post)
    } catch (err) {
      res.send(err)
    }
  },
  async delete (req, res) {
    try {
      post = await Post.findOne({_id: req.params.postId})
      if(post.userId !== req.userId) {
        throw 'cannot post as someone else'
      }
      cb = await Post.deleteOne({_id: req.params.postId})
      res.send(cb)
    } catch (err) {
      res.send(err)
    }
  }
}