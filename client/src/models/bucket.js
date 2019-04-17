const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Bucket = function(url) {
  this.url = url;
};

Bucket.prototype.bindEvents = function () {
  PubSub.subscribe('Form-View:item-submitted', (evt) => {
    this.postItem(evt.detail);
  })
  PubSub.subscribe('DisplayView:item-deleted', (evt) => {
    this.deleteItem(evt.detail);
  })
};

Bucket.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
    .then( (items) => {
      PubSub.publish('Bucket:items-ready', items);
    })
    .catch(console.error);
};

Bucket.prototype.postItem = function (item) {
  const request = new Request(this.url);
  request.post(item)
    .then( (items) => {
      PubSub.publish('Bucket:items-ready', items);
    })
    .catch(console.error);
};

Bucket.prototype.deleteItem = function (id) {
  const request = new Request(this.url);
  request.delete(id)
    .then( (items) => {
      PubSub.publish('Bucket:items-ready', items);
    })
    .catch(console.error);
};

module.exports = Bucket;
