'use strict'

var imageElements = document.getElementsByTagName('img');
// var labelElements = document.getElementsByTagName('label');
var imageI1 = 0;
var imageI2 = 1;
var imageI3 = 2;
var rounds = 5;

var allImages =[];
// create constructor function
function Images(name, imagePath){
    this.name2 = name;
    this.imagePath = imagePath;
    this.clickCounter = 0;
    allImages.push(this);
    this.allProducts = [];
}

// create the images and their paths. 
new Images('A bag', 'images/bag.jpg');
new Images('A banana slicer', 'images/banana.jpg');
new Images('A iPad and toliet paper holder', 'images/bathroom.jpg');
new Images('Yellow, open-toed, boots', 'images/boots.jpg');
new Images('A breakfast maker', 'images/breakfast.jpg');
new Images('Meatball flavored bubblegum', 'images/bubblegum.jpg');
new Images('An uncomfortable chair', 'images/chair.jpg');
new Images('An Elder God', 'images/cthulhu.jpg');
new Images('A dog that is also a duck', 'images/dog-duck.jpg');
new Images('Ham from a dragon', 'images/dragon.jpg');
new Images('Pen accessories', 'images/pen.jpg');
new Images('Pet booties/brooms', 'images/pet-sweep.jpg');
new Images('Scissors for your pizza', 'images/scissors.jpg');
new Images('A shark sleeping bag', 'images/shark.jpg');
new Images('A baby onesie/broom', 'images/sweep.png');
new Images('A Tauntaun sleeping bag', 'images/tauntaun.jpg');
new Images('Unicorn meat', 'images/unicorn.jpg');
new Images('USB that is also a tail', 'images/usb.gif');
new Images('A really bad watering can', 'images/water-can.jpg');
new Images('A poor wineglass', 'images/wine-glass.jpg');

var totalClicks = 0;
function ifImageClicked(event){
    totalClicks += 1;
    if(event.srcElement[imageI1] === '1'){
      allImages[imageI1].this.clickCounter++;
    } else if (event.srcElement[imageI2] === '2'){
        allImages[imageI2].this.clickCounter++;
    }
      else if (event.srcElement[imageI3] === '3'){
        allImages[imageI3].this.clickCounter++;
    }

    // add code to prevent same images from being shown. 3 sections needed. Code logic taken from lecture
    var nextImage1 = Math.floor(Math.random() * allImages.length);
    while((nextImage1 === imageI1) || (nextImage1 === nextImage2) || (nextImage1 === nextImage3)){
        nextImage1 = Math.floor(Math.random() * allImages.length);
        console.log('Image 1', nextImage1)
    }

    var nextImage2 = Math.floor(Math.random() * allImages.length);
    while((nextImage2 === imageI2) || (nextImage2 === nextImage1) || (nextImage2 === nextImage3)){
        nextImage2 = Math.floor(Math.random() * allImages.length);
        console.log('Image 2', nextImage2)
    }

    var nextImage3 = Math.floor(Math.random() * allImages.length);
    while((nextImage3 === imageI3) || (nextImage3 === nextImage1) || (nextImage3 === nextImage2)){
        nextImage3 = Math.floor(Math.random() * allImages.length);
        console.log('Image 3', nextImage3)
    }
    imageI1 = nextImage1;
    imageI2 = nextImage2;
    imageI3 = nextImage3;

    imageElements[0].src = allImages[imageI1].imagePath;
    // labelElements[0].src = allImages[imageI1].name;
    imageElements[1].src = allImages[imageI2].imagePath;
    imageElements[2].src = allImages[imageI3].imagePath;

    // end the operation and stop showing the use new images
    if(totalClicks >= rounds){
        var footerElement = document.getElementsByTagName('footer')[0];
        if(footerElement.firstElementChild){
        footerElement.firstElementChild.remove();
        }
        footerElement.textContent = 'You have finished this product testing';
        // function call to remove the event listener
        removeListener();
        Images.prototype.render();
    }
}

// functions to add and remove an event listener
for(var i = 0; i < imageElements.length; i++){
    console.log('Event listen on the images');
    imageElements[i].addEventListener('click', ifImageClicked); //  removeEventListener
  }

function removeListener(){
    for(var i = 0; i < imageElements.length; i++){
        imageElements[i].removeEventListener('click', ifImageClicked);
    }   
}


// function to create a list of results when the view results button is clicked. 
var resultElements = document.getElementById('results');

Images.prototype.render = function(){
    for(var i = 0; i < imageElements.length; i++){
        var listI = document.createElement('li');
        var resultStr = imageElements[i].name2 + ' was clicked: ' + this.clickCounter + " times.";
        listI.textContent = resultStr;
        resultElements.appendChild(listI);
    }
}


























// below code found on stackoverflow (https://stackoverflow.com/questions/53019969/how-to-change-text-color-in-marquee-tag-on-every-refresh)
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 16)];
    }
    return color;
}
var marquee = document.getElementById('Marquee');
marquee.style.color = getRandomColor();
marquee.style.backgroundColor = getRandomColor();