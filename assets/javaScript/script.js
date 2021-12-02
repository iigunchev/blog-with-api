
function randonImg() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://picsum.photos/200/300", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
var randonimg= ''

function insertimg(id) {
    img = document.getElementById('id')
    randonimg= randonImg()
    img.setAttribute('src', randonimg )
}