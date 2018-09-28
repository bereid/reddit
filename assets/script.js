window.onload = () => {
  const host = 'http://localhost:8080'
  const maincontent = document.querySelector('.main-content');
  const http = new XMLHttpRequest();
  http.open('GET', `${host}/posts`, true);
  http.onload = () => {
    let postList = JSON.parse(http.response);
    postList.forEach(post => {
      let newPostDiv = document.createElement('div');
      newPostDiv.classList.add('post');
      maincontent.appendChild(newPostDiv);
      
      let voter = document.createElement('div');
      voter.classList.add('voter');
      newPostDiv.appendChild(voter);
      
      let postContent = document.createElement('div');
      postContent.classList.add('postcontent');
      newPostDiv.appendChild(postContent);

    });
  }
  http.send(); 
}