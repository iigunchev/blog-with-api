var imgdirection=[]
function imgRandon() {
    page= Math.floor((Math.random() * 482) + 1);
    console.log(page)
    fetch("https://api.unsplash.com/search/photos?query=travelling&page="+page+"&client_id=KqhYMraQy6eKA2IZ9lFNthSDFdwf9SksbYpVB7qmr4M")
    .then(response => response.json())
    .then(result =>{
        //let imgNum= Math.floor((Math.random() * 9) + 1);
        // imgdirection.push(result.results[imgNum].urls.regular)
        cont= 0
        while (cont < 9){

            imgdirection.push(result.results[cont].urls.regular)
            cont ++
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