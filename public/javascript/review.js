async function reviewFormHandler(event) {
  event.preventDefault();

  const review_text = document.querySelector("#review-body").value.trim();
  const review_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(review_text);
  if (review_text) {
    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        review_id,
        review_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      //      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#review-btn")
  .addEventListener("click", reviewFormHandler);
