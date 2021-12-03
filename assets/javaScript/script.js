var imgdirection = []
function imgRandon() {
    page = Math.floor((Math.random() * 482) + 1);
    //console.log(page)
    fetch("https://api.unsplash.com/search/photos?query=travelling&page=" + page + "&client_id=KqhYMraQy6eKA2IZ9lFNthSDFdwf9SksbYpVB7qmr4M")
        .then(response => response.json())
        .then(result => {
            //let imgNum= Math.floor((Math.random() * 9) + 1);
            // imgdirection.push(result.results[imgNum].urls.regular)
            cont = 0
            while (cont < 5) {

                imgdirection.push(result.results[cont].urls.regular)
                cont++
            }
            //console.log(imgdirection)
        })
        .catch(error => console.log('error', error));

}

async function runImg() {
    imgRandon()
    createImg()
}

function otherfunc() {
    titleBody = $('.caption')
    //console.log(titleBody)
    for (let index = 0; index < titleBody.length; index++) {
        createTitleBody(index)
        //console.log(index)
    }
}

function cleanImg() {
    var ImgTag = document.getElementsByClassName("imgtoCreate");
    setTimeout(() => {
        for (i = 0; i < ImgTag.length; i++) {
            ImgTag[i].removeAttribute('src');
        }
    }, 500);
}


var postCont = 1
function createTitleBody(num) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postCont}`)
    .then((response) => response.json())
    .then((json) => {
        $(".caption h3").eq(num).text(json.title)
        $(".caption p").eq(num).text(json.body)
        //$('.imgtoCreate').eq(num).attr('src', imgdirection[contImg])
        //console.log($('img').eq(num).attr('src', imgdirection[postCont]))
    });
    //contImg++
    postCont++
    //console.log(postCont, contImg)
}

var contImg= 0
function createImg() {
    var ImgTag = document.getElementsByClassName("imgtoCreate");
    setTimeout(() => {
        for (i = 0; i < ImgTag.length; i++) {
            ImgTag[i].setAttribute('src', imgdirection[contImg]);
            contImg++
        }
    }, 500);

}

function createCarrusel() {

    let carrusel = document.getElementById('carruselAppend')
    carrusel.innerHTML = `<div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
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
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev" id='btnPrevius'>
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next" id='btnNext'>
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>`

        btnPrev= document.getElementById('btnPrevius')
        btnNext= document.getElementById('btnNext')

        btnNext.addEventListener('click', function () {
            otherfunc()
            runImg()
            console.log('11111111111111')
        })

        btnPrev.addEventListener('click', ()=>{
            console.log(postCont, contImg)
            postCont -= 3;
            contImg -= 3;
            //callFunc()
            postCont, contImg
            console.log(postCont, contImg)
            console.log('22222222222222222222')
        })
}

 function callFunc() {
                otherfunc()
                runImg()
            }

