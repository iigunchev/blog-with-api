var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => {
        $( "#postTitle" ).text(json.title);
        $( ".postBody" ).text(json.body);
})

fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(json => {
    $( "#username" ).text(json.username);
    $( "#email" ).text(json.email);
})

    $( "#loadComments" ).on('click', () => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
        .then(response => response.json())
        .then(json => {
            json.forEach(comment => {
                const commentDiv = $( `
                <div class='comment'>
                <h5>${comment.name}</h5>
                <p>${comment.body}</p>
                <span><i>${comment.email}</i></span>
                <hr>
                </div>
                ` );
                $( ".modal-footer" ).prepend(commentDiv);
            })
        })
})