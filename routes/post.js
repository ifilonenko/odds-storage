var azure = require('azure-storage');
var async = require('async');

module.exports = Post

function Post(video) {
  this.video = video;
}

Post.prototype = {
  addVideo: function(req,res) {
    var self = this
    // user_id, post_id, .mp4
    var user_id = req.body.user_id;
    var post_id = req.body.post_id;
    // upload mp4 video?
    var mp4Video = req.mp4
    // 
    self.video.addVideo(item, function itemAdded(error) {
      if(error) {
        throw error;
      }
      res.redirect('/');
    });
  }
}