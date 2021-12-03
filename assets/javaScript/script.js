var imgdirection = []
function imgRandon() {
    page = Math.floor((Math.random() * 482) + 1);
    console.log(page)
    fetch("https://api.unsplash.com/search/photos?query=travelling&page=" + page + "&client_id=KqhYMraQy6eKA2IZ9lFNthSDFdwf9SksbYpVB7qmr4M")
        .then(response => response.json())
        .then(result => {
            //let imgNum= Math.floor((Math.random() * 9) + 1);
            // imgdirection.push(result.results[imgNum].urls.regular)
            cont = 0
            while (cont < 9) {

                imgdirection.push(result.results[cont].urls.regular)
                cont++
            }
            console.log(imgdirection)
        })
        .catch(error => console.log('error', error));
}

async function runImg() {
    imgRandon()
    createImg()
}


function createImg() {
    var ImgTag = document.getElementsByClassName("imgtoCreate");
    setTimeout(() => {
        for (i = 0; i < ImgTag.length; i++) {
            ImgTag[i].setAttribute('src', imgdirection[i]);
        }
    }, 500);

}

runImg()

function createCarrusel() {

    let carrusel = document.getElementById('carruselAppend')
    carrusel.innerHTML= `<div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
    <div class="carousel-inner" > -->
        <div class="carousel-item active">
        <div class="d-block w-100">
            <div class="row row-cards">
                <div class="col-sm-10 col-md-8 col-lg-3">
                        <div class="thumbnail">
                            <img class="imgtoCreate">
                            <div class="caption">
                                <h3>Post Title </h3>
                                <p>Post Body</p>
                                <div class="row">
                                    <button class="col-md-8 btn btn-primary " role="button"> Read More here
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10 col-md-8 col-lg-3">
                        <div class="thumbnail">
                            <img class="imgtoCreate">
                            <div class="caption">
                                <h3>Post Title </h3>
                                <p>Post Body</p>
                                <div class="row">
                                    <button class="col-md-8  btn btn-primary " role="button"> Read More here
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10 col-md-8 col-lg-3">
                        <div class="thumbnail">
                            <img class="imgtoCreate">
                            <div class="caption">
                                <h3>Post Title </h3>
                                <p>Post Body </p>
                                <div class="row">
                                    <button class="col-md-8  btn btn-primary " role="button"> Read More here
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `
}

