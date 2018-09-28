window.onload = () => {
  const host = 'http://localhost:8080'
  const maincontent = document.querySelector('.main-content');
  const http = new XMLHttpRequest();
  const downVoteImg = 'assets/downvote.png'
  const upVoteImg = 'assets/upvote.png'
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

      let upVoter = document.createElement('img');
      upVoter.src = upVoteImg;
      voter.appendChild(upVoter);

      let voteNumber = document.createElement('p');
      voteNumber.classList.add('votenumber');
      voteNumber.innerText = post.score;
      voter.appendChild(voteNumber);

      let downVoter = document.createElement('img');
      downVoter.src = downVoteImg;
      voter.appendChild(downVoter);

      let postLink = document.createElement('a');
      postLink.classList.add('postlink')
      postLink.href = post.url;
      postLink.innerHTML = post.title;
      postContent.appendChild(postLink);

      let submitDate = document.createElement('p');
      submitDate.classList.add('submitdate')
      submitDate.innerHTML = `Posted at: ${post.date}`;
      postContent.appendChild(submitDate);

    });
  }
  http.send(); 
}