async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="movie-title"]').value;
  const movie_url = document.querySelector('input[name="movie-url"]').value;

  const response = await fetch(`/api/movies`, {
    method: "POST",
    body: JSON.stringify({
      title,
      movie_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-movie-form")
  .addEventListener("submit", newFormHandler);
