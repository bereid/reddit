window.onload = () => {
  const host = 'http://localhost:8080'
  const maincontent = document.querySelector('main-content');
  const http = new XMLHttpRequest();
  http.open('GET', `${host}/posts`, true);
  http.onload = () => {
    let postList = JSON.parse(http.response);
    console.log(postList);
  }
  http.send(); 
}