var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-tt="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
// Fetching post elements from API

function createPostInfo(post) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${post}`)
    .then((response) => response.json())
    .then((json) => {
      $("#postTitle").text(json.title);
      $(".postBody").text(json.body);
    });
}
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((json) => {
    $("#username").html(`<u>Post by</u> <b>${json.username}</b>  |`);
    $("#email").html(`  <i>${json.email}</i>`);
  });
// Load / hide comments
$("#loadComments").on("click", () => {
  fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((comment) => {
        commentDiv = $(`
                <div class='comment'>
                <h5>${comment.name}</h5>
                <p>${comment.body}</p>
                <span><i>${comment.email}</i></span>
                <hr>
                </div>
                `);
        $(".modal-footer").append(commentDiv);
      });
    });
});
// Update post
$("#updatePostBtn").one("click", () => {
  $("#alert-update-success").removeClass("hide");
  $("#alert-update-success").addClass("show");
  setTimeout(() => {
    $("#alert-update-success").fadeOut(2000);
  }, 1000);
});
// Delete post
$("#deletePostBtn").one("click", () => {
  $("#alert-update-success").text("The post has been successfully deleted");
  $("#alert-update-success").removeClass("hide");
  $("#alert-update-success").addClass("show");
  setTimeout(() => {
    $("#alert-update-success").fadeOut(2000);
  }, 1000);
});
