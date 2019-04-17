const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
 .then( (client) => {
   const db = client.db('bucket_list');
   const itemsCollection = db.collection('items');
   const itemsRouter = createRouter(itemsCollection);
   app.use('/api/items', itemsRouter);
 })
 .catch(console.error);

 const publicPath = path.join(__dirname, '../client/public');
 app.use(express.static(publicPath));

 app.use(parser.json());

 app.listen(3000, function() {
   console.log(`Listening on port ${this.address().port}`);
 });
