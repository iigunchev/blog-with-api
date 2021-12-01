
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