const FormView = require('./views/form_view.js');
const DisplayView = require('./views/display_view.js');
const Bucket = require('./models/bucket.js');

document.addEventListener('DOMContentLoaded', () => {
  const bucketForm = document.querySelector('.form');
  const bucketFormView = new FormView(bucketForm);
  bucketFormView.bindEvents();

  const bucketGridDiv = document.querySelector('.div');
  const bucketGridView = new DisplayView(bucketGridDiv);
  bucketGridView.bindEvents();

  const bucketUrl = 'http://localhost:3000/api/items';
  const bucket = new Bucket(bucketUrl);
  bucket.bindEvents();
  bucket.getData();
});
