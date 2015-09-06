var azure = require('azure-storage');
var uuid = require('node-uuid');
var entityGen = azure.TableUtilities.entityGenerator;

module.exports = Video;

function Video(storageClient, tableName, partitionKey) {
  this.storageClient = storageClient;
  this.tableName = tableName;
  this.partitionKey = partitionKey;
  this.storageClient.createTableIfNotExists(tableName, function tableCreated(error) {
    if(error) {
      throw error;
    }
  });
};
Video.prototype = {
  find: function(query, callback) {
    self = this;
    self.storageClient.queryEntities(this.tableName, query, null, function entitiesQueried(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(null, result.entries);
      }
    });
  },

  addVideo: function(video, callback) {
    self = this;
    // use entityGenerator to set types
    // NOTE: RowKey must be a string type, even though
    // it contains a GUID in this example.
    var fileInfo = {
      PartitionKey: entityGen.String(self.partitionKey),
      RowKey: entityGen.String(uuid()),
      user_id: entityGen.String(video.user_id),
      post_id: entityGen.String(video.post_id),
      file: entityGen.Boolean(false)
    };
    self.storageClient.insertEntity(self.tableName, itemDescriptor, function entityInserted(error) {
      if(error){  
        callback(error);
      }
      callback(null);
    });
  }
}