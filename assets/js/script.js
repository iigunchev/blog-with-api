let page = 1;
let img = 0;
generateBlogPosts(page);
initAll();

// Blog list generation
function generateBlogPosts(num) {
  for (let i = num * 10 - 9; i < num * 10; i++) {
    let imgSrc = "";
    let username = "";
    let portfolio = "";
    fetch(
      `https://api.unsplash.com/search/photos?query=travelling&orientation=landscape&client_id=riw-OTey4wubCdHBzxIgq1Es8wEk_poyi-HJjww1c98&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        imgSrc = data.results[img].urls.regular;
        username = data.results[img].user.username;
        portfolio = data.results[img].user.portfolio_url;
        img++;
      })
      .catch(err => {
        imgSrc = "https://images.unsplash.com/photo-1639036020433-0b9b752cb3b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      } )
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((data) => {
        let blogPost = $(`
                <a href="#" class="list-group-item list-group-item-action" aria-current="true" data-linkId="${i}" >
                    <div class="d-flex w-100 justify-content-between contenedor">
                        <div class="col-12 col-lg-3 img-div post" data-bs-toggle="modal" data-bs-target="#postModal" data-postId="${i}" ><img id="imgPost${i}" src="${imgSrc}" class="rounded img-fluid" alt="..." ></div>
                        <div class="d-flex col-12 col-lg-8 post" data-bs-toggle="modal" data-bs-target="#postModal" data-postId="${i}">
                            <div class='ms-3 d-flex flex-column align-items-stretch'>
                                <h3 class="mb-1 " id="titlePost${i}">${data[i].title}</h3>
                                <span class="author${i} author-main justify-self-end">by <span class='author-highlight'><b>${username}</b></span></span>
                                <p class="mb-1" id="bodyPost${i}">${data[i].body}</p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-1 text-end">
                            <button type="button" class="btn editPostBtn" data-bs-toggle="modal" data-tt="tooltip"
                                data-bs-target="#editModal" data-bs-placement="top" data-edit="${i}" title="Edit post">
                                <span class="material-icons"> edit </span>
                            </button>
                            <button type="button" class="btn deletePostBtn" data-tt="tooltip"
                                data-bs-placement="top" title="Delete post" data-delete="${i}">
                                <span class="material-icons"> delete_forever </span>
                            </button>
                        </div>
                    </div>
                </a>
                `);
        $(".list-group").append(blogPost);
      });
  }
  img = 0;
}

function initAll() {
  setTimeout(() => {
    let postsLinks = document.querySelectorAll(".post");
    let editBtns = document.querySelectorAll(".editPostBtn");
    let deleteBtns = document.querySelectorAll(".deletePostBtn");
    let postId;
    //   Post modals
    postsLinks.forEach((post) => {
      post.addEventListener("click", () => {
        $(".comment-section").remove();
        postId = post.getAttribute("data-postId");
        $("#postImg").attr("src", $(`#imgPost${postId}`).attr("src"));
        $("#postTitle").text($(`#titlePost${postId}`).text());
        $(".postBody").text($(`#bodyPost${postId}`).text());
        $("#username").text($(`.author${postId}`).text());
        $("#username").addClass("italic");
        $("#loadComments").one("click", () => {
          fetch(
            `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
          )
            .then((response) => response.json())
            .then((json) => {
              $(".modal-footer").append(
                $("<div class='comment-section'></div>")
              );
              json.forEach((comment) => {
                commentDiv = $(`
                <div class='comment'>
                <h5>${comment.name}</h5>
                <p>${comment.body}</p>
                <span><i>${comment.email}</i></span>
                <hr>
                </div>
                `);
                $(".comment-section").append(commentDiv);
              });
            });
        });
      });
    });
    //   Edit button
    initEditButtons(editBtns, postId);

    //   Delete button
    initDeleteButtons(deleteBtns, postId);

    //   Tooltips
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-tt="tooltip"]')
    );
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, 1000);
}

// Infinite Scroll
const postContainer = document.querySelector(".list-group");
postContainer.addEventListener("scroll", function () {
  if (
    postContainer.scrollTop + postContainer.clientHeight >=
    postContainer.scrollHeight
  ) {
    page++;
    generateBlogPosts(page);
    initAll();
  }
});


// FUNCTIONS
function initEditButtons(buttons, post) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      post = btn.getAttribute("data-edit");
    });
  });
  let updateBtn = $("#updatePostBtn");
  $(updateBtn).on("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${post}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: $("#editPostTitle").val(),
        body: $("#editPostBody").val(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        $(`*[data-postId="${post}"] h5`).text($("#editPostTitle").val());
        $(`*[data-postId="${post}"] p`).text($("#editPostBody").val());
        $("#alert-update-success").removeClass("hide");
        $("#alert-update-success").addClass("show");
        setTimeout(() => {
          $("#alert-update-success").fadeOut(2000);
        }, 1000);
      });
  });
}

function initDeleteButtons(buttons, post) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      post = btn.getAttribute("data-delete");
      fetch(`https://jsonplaceholder.typicode.com/posts/${post}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((json) => {
          $("#alert-update-success").removeClass("hide");
        $("#alert-update-success").addClass("show");
        $("#alert-update-success").text('The post has been successfully deleted')
        setTimeout(() => {
          $("#alert-update-success").fadeOut(2000);
        }, 1000);
          document.querySelector(`[data-linkid="${post}"]`).remove();
        });
    });
  });
}
