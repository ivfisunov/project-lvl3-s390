import $ from 'jquery';
import validator from 'validator';

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
      const button = document.createElement('button');
      a.textContent = item.itemTitle;
      a.href = item.itemLink;
      button.textContent = 'Open';
      button.classList.add('btn');
      button.classList.add('btn-outline-primary');
      button.classList.add('btn-sm');
      button.style = 'float: right';
      button.id = 'button-open-modal';
      button.dataset.description = item.itemDescription;
      button.dataset.title = feed.feedTitle;
      button.addEventListener('click', (e) => {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        modalTitle.textContent = e.target.dataset.title;
        modalBody.textContent = e.target.dataset.description;
        $('#modal').modal('show');
      });
      li.append(a);
      li.append(button);
      li.style = 'padding: 5px';
      ul.append(li);
    });
    const div = document.createElement('div');
    div.innerHTML = feedHead;
    div.append(ul);
    feeds.append(div);
  });
};

export const renderError = (state) => {
  const error = document.getElementById('error');
  const errMessage = `
    <div class="alert alert-danger fade show" id="error" role="alert">
    <h3>Ups... Something gone wrong!</h3>
    <p>${state.error}</p>
    </div>
    `;
  error.style.removeProperty('display');
  error.innerHTML = errMessage;
  setTimeout(() => {
    $('#error').slideUp('slow');
  }, 3000);
};

export const renderStatus = (state) => {
  const inputUrl = document.getElementById('input-url');
  const button = document.getElementById('button');
  const loadIcon = document.getElementById('load-icon');
  loadIcon.style.visibility = 'hidden';
  if (state.status === 'error') {
    inputUrl.classList.add('is-valid');
    inputUrl.classList.remove('is-invalid');
    button.disabled = false;
    inputUrl.disabled = false;
  } else if (state.status === 'loading...') {
    inputUrl.disabled = true;
    loadIcon.style.visibility = 'visible';
  } else if (state.status === 'loaded') {
    loadIcon.style.visibility = 'hidden';
  }
};

export const renderInput = (state) => {
  const inputUrl = document.getElementById('input-url');
  const button = document.getElementById('button');
  button.disabled = true;
  inputUrl.disabled = false;

  if (state.inputUrl === '') {
    inputUrl.classList.remove('is-valid');
    inputUrl.classList.remove('is-invalid');
    inputUrl.value = '';
  } else if (!validator.isURL(state.inputUrl) || state.urls.includes(state.inputUrl)) {
    inputUrl.classList.remove('is-valid');
    inputUrl.classList.add('is-invalid');
  } else {
    inputUrl.classList.add('is-valid');
    inputUrl.classList.remove('is-invalid');
    button.disabled = false;
  }
};
