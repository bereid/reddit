window.onload = () => {
  const host = 'http://localhost:8080';
  const currentId = localStorage.getItem('currentId');
  const currentTitle = localStorage.getItem('currentTitle');
  const currentUrl = localStorage.getItem('currentUrl');
  const modifyForm = document.querySelector('form');
  const postTitle = document.querySelector('#title');
  const postUrl = document.querySelector('#url');
  modifyForm.action = `${host}/posts/${currentId}`;
  postTitle.value = currentTitle;
  postUrl.value = currentUrl;
}