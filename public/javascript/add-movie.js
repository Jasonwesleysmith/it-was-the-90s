async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="movie-title"]').value;
    const post_url = document.querySelector('input[name="movie-url"]').value;
  
    const response = await fetch(`/api/movies`, {
      method: 'MOVIE',
      body: JSON.stringify({
        title,
        post_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);