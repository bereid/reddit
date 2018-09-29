window.onload = () => {
  const host = 'http://localhost:8080'
  const maincontent = document.querySelector('.main-content');
  const http = new XMLHttpRequest();
  const downVoteImg = 'assets/downvote.png';
  const upVoteImg = 'assets/upvote.png';
  const submitButton = document.querySelector('.submit');
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
      submitDate.classList.add('submitdate');
      let currentDate = new Date();
      let currentDateInNumberTimeStamp = Date.parse(currentDate);
      let postDateInNumberTimeStamp = Date.parse(post.date);
      let elapsedTime = 
      Math.floor((currentDateInNumberTimeStamp-postDateInNumberTimeStamp)/3600000);
      submitDate.innerHTML = `submitted ${elapsedTime} hours ago by ${post.owner}`;
      postContent.appendChild(submitDate);


    });

    submitButton.addEventListener('click', () => {
      location.href=`${host}/add-post`;
    });

  }
  http.send();
}