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

// Blog list generation
function generateBlogPosts() {
  for (let i = 0; i < 10; i++) {
    let imgSrc = ''
    fetch('https://api.unsplash.com/search/photos?query=travelling&orientation=squarish&client_id=riw-OTey4wubCdHBzxIgq1Es8wEk_poyi-HJjww1c98')
    .then(response => response.json())
    .then(data => imgSrc = data.results[i].urls.small)
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(response => response.json())
        .then(data => {
            let blogPost = $(`      
                <a href="#" class="list-group-item list-group-item-action" aria-current="true" data-bs-toggle="modal" data-bs-target="#postModal">
                <div class="d-flex w-100 justify-content-between">
                    <div class="d-flex col-9">
                        <img src="${imgSrc}" class="" alt="..." width="100" height="100">
                        <div class='ms-3'>
                        <h5 class="mb-1">${data[i].title}</h5>
                        <p class="mb-1">${data[i].body}</p>
                        </div>
                    </div>
                    <small class="col-2 text-end">
                        <button type="button" class="btn" data-bs-toggle="modal" data-tt="tooltip"
                            data-bs-target="#editModal" data-bs-placement="top" title="Edit post">
                            <span class="material-icons"> edit </span>
                        </button>
                        <button type="button" id="deletePostBtn" class="btn" data-bs-dismiss="modal" data-tt="tooltip"
                            data-bs-placement="top" title="Delete post">
                            <span class="material-icons"> delete_forever </span>
                        </button>
                    </small>
                </div>
                </a>
                `);
            $(".list-group").append(blogPost);
        })
    }
}

generateBlogPosts();