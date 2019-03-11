const MongoClient = require("mongodb").MongoClient
const assert = require('assert');
var M = module.exports = {}
M.open = function () {
  MongoClient.connect('mongodb://localhost:27018/express-images', { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    M.db = client.db("express-images");


  });

}

M.insert = function (images_content, images_comment) {//images_content檔案資料
  // Get the documents collection
  const collection = M.db.collection('images');
  // Insert some documents
  for (var i = images_content.length - 1; i >= 0; i--)images_content[i].comment = images_comment
  collection.insertMany(
    images_content
    , function (err, result) {
      assert.equal(err, null);
    }); console.log("Inserted documents into the collection");
}

M.find = function (callback) {
  const collection = M.db.collection('images');
  collection.find("file").toArray().then(function (items) {
    //console.log(items);
    return callback(items)
  });
}