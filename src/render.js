import $ from 'jquery';

export const renderFeed = (state) => {
  const feeds = document.getElementById('feeds');
  feeds.innerHTML = '';

  state.feeds.forEach((feed) => {
    const feedHead = `
      <div class="list-group-item list-group-item-success">
        <h4>${feed.feedTitle}</h4>
        <p>${feed.feedDescription}</p>
      </div>
    `;
    const ul = document.createElement('ul');
    feed.feedItems.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = item.itemTitle;
      a.href = item.itemLink;
      li.append(a);
      ul.append(li);
    });

    const div = document.createElement('div');
    div.innerHTML = feedHead;
    div.append(ul);
    feeds.append(div);
  });
};

export const renderError = (state) => {
  const feeds = document.getElementById('feeds');
  const errMessage = `
    <div class="alert alert-danger fade show" id="error" role="alert">
    <h3>Ups... Something gone wrong!</h3>
    <p>${state.error}</p>
    </div>
    `;
  feeds.insertAdjacentHTML('afterbegin', errMessage);
  setTimeout(() => {
    $('#error').fadeOut('slow');
  }, 3000);
};
