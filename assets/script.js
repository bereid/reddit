window.onload = () => {
  const host = 'http://localhost:8080'
  const maincontent = document.querySelector('.main-content');
  const submitButton = document.querySelector('.submit');
  const getPosts = new XMLHttpRequest();
  const downVoteImg = 'assets/downvote.png';
  const downVotedImg = 'assets/downvoted.png';
  const upVoteImg = 'assets/upvote.png';
  const upVotedImg = 'assets/upvoted.png';
  const upvote = (postid) => {
    getPosts.open('PUT', `${host}/posts/${postid}/upvote`, true);
    getPosts.onload = () => {};
    getPosts.send();
  }
  const downvote = (postid) => {
    getPosts.open('PUT', `${host}/posts/${postid}/downvote`, true);
    getPosts.onload = () => {};
    getPosts.send();
  }

  const deleting = (postid) => {
    getPosts.open('DELETE', `${host}/posts/${postid}`, true);
    getPosts.onload = () => {};
    getPosts.send();
  }

  getPosts.open('GET', `${host}/posts`, true);
  getPosts.onload = () => {
    let postList = JSON.parse(getPosts.response);
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

      let upVoter = document.createElement('input');
      upVoter.type = 'image';
      upVoter.src = upVoteImg;
      upVoter.alt = 'submit';
      upVoter.classList.add('upvote-button');
      voter.appendChild(upVoter);

      upVoter.addEventListener('click', () => {
        upVoter.src = upVotedImg;
        upvote(post.id);
        voteNumber.innerText = (Number(voteNumber.innerText) + 1);
      });

      let voteNumber = document.createElement('p');
      voteNumber.classList.add('votenumber');
      voteNumber.innerText = post.score;
      voter.appendChild(voteNumber);

      let downVoter = document.createElement('input');
      downVoter.type = 'image';
      downVoter.src = downVoteImg;
      downVoter.alt = 'submit';
      downVoter.classList.add('downvote-button');
      voter.appendChild(downVoter);

      downVoter.addEventListener('click', () => {
        downVoter.src = downVotedImg;
        downvote(post.id);
        voteNumber.innerText = (Number(voteNumber.innerText) - 1);
      });

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
        Math.floor((currentDateInNumberTimeStamp - postDateInNumberTimeStamp) / 3600000);
      submitDate.innerHTML = `submitted ${elapsedTime} hours ago by ${post.owner}`;
      postContent.appendChild(submitDate);

      let modifyButton = document.createElement('a');
      modifyButton.classList.add('modify');
      modifyButton.innerHTML = 'modify <i class="far fa-edit"></i>';
      postContent.appendChild(modifyButton);

      modifyButton.addEventListener('click', () => {
        localStorage.setItem('currentId', post.id);
        localStorage.setItem('currentTitle', post.title);
        localStorage.setItem('currentUrl', post.url);
        location.href = `${host}/modify-post/${post.id}`;
      });

      let deleteButton = document.createElement('a');
      deleteButton.classList.add('delete');
      deleteButton.href = `${host}/`;
      deleteButton.innerText = 'delete';
      postContent.appendChild(deleteButton);

      deleteButton.addEventListener('click', () => {
        deleting(post.id);
      });

    });

    submitButton.addEventListener('click', () => {
      location.href = `${host}/add-post`;
    });

  }
  getPosts.send();
}