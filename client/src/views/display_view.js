const PubSub = require('../helpers/pub_sub.js');

const DisplayView = function(container) {
  this.container = container;
}

DisplayView.prototype.bindEvents = function () {
  PubSub.subscribe('Bucket:items-ready', (evt) => {
    this.render(evt.detail);
  })
};

DisplayView.prototype.render = function (items) {
  this.container.innerHTML = '';

  for (var i = 0; i < items.length; i++) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-div')
    itemDiv.id = 'item';

    const name = document.createElement('h3');
    name.textContent = items[i].item;
    itemDiv.appendChild(name);

    const deleteButton = this.createDeleteButton(items[i]._id);
    itemDiv.appendChild(deleteButton);

    this.container.appendChild(itemDiv);
  }
};

DisplayView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('ass-button');
  button.value = itemId;

  button.addEventListener('click', (evt) => {
    PubSub.publish('DisplayView:item-deleted', evt.target.value);
  });

  return button;
};

module.exports = DisplayView;
