'use strict'

var imageElements = document.getElementsByTagName('img');
var imageI1 = 0;
var imageI2 = 1;
var imageI3 = 2;
var rounds = 3;


// create constructor function
function Images(name, imagePath){
    this.name = name;
    this.imagePath = imagePath;
    this.clickCounter = 0;
    allImages.push(this);
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

var totalCLicks = 0;
function ifImageClicked(event){

}