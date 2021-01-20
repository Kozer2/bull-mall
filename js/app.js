'use strict'
var imageElements = document.getElementsByTagName('img');
console.log('image elements source', imageElements);
// var labelElements = document.getElementsByTagName('label');
var imageI1 = 0;
var imageI2 = 1;
var imageI3 = 2;
var rounds = 25;
var allImages =[];
// create constructor function
function Images(name, imagePath, clickCounter){
    this.name2 = name;  // changed to name2 from name due to render function saying it was deprecaited. 
    this.imagePath = imagePath;
    if(clickCounter){
        this.clickCounter = clickCounter;
    } 
    else {
        this.clickCounter = 0;
    }
    this.timesShown = 0;
    allImages.push(this);
    this.allProducts = [];
} // end of constructor 

// function to allow the chart to render the objects from the constructor
function imagesArray(object){
    var imageArray = [];
    for(var i = 0; i < allImages.length; i++){
      imageArray[i] = allImages[i][object];
    }
    console.log('images ',imageArray);
    return imageArray;
  } // end of imagesArray function

  // code below is to check if local storage is already being used and if not to move on and run the code. Will add more code further down to handle new information being saved
 // need to create a variable to check on local storage with if/else for the rest
var checkIfLocalImageExists = localStorage.getItem('localImage');
if(checkIfLocalImageExists){
    console.log('Local storage does exist', checkIfLocalImageExists);
    var willBeParsed = JSON.parse(checkIfLocalImageExists);
    for(var u = 0; u < willBeParsed.length; u++){
        new Images(willBeParsed[u].name2, willBeParsed[u].imagePath, willBeParsed[u].clickCounter);
    } // end for loop
} // end if need to start else 
else{
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
} // end else

// count first images
for(var i = 0; i < 3; i++){
    allImages[i].timesShown++;
    // console.log(allImages[i]);
} // end for loop 


var totalClicks = 0;
function ifImageClicked(event){
    totalClicks += 1;
    if(event.srcElement.id === 'one'){
      allImages[imageI1].clickCounter++;
    }
     else if (event.srcElement.id === 'two'){
        allImages[imageI2].clickCounter++;
    }
      else if (event.srcElement.id === 'three'){
        allImages[imageI3].clickCounter++;
    } // end if / else if 

    // console.log('total clicks', totalClicks);
    // console.log('click counter', totalClicks)
    // add code to prevent same images from being shown. 3 sections needed. Code logic taken from lecture
    var nextImage1 = Math.floor(Math.random() * allImages.length);
    while(

        (nextImage1 === imageI1) || (nextImage1 === nextImage2) || (nextImage1 === nextImage3))
        
        {
        nextImage1 = Math.floor(Math.random() * allImages.length);
        // console.log('Image 1', nextImage1)
    }
    var nextImage2 = Math.floor(Math.random() * allImages.length);
    while((nextImage2 === imageI2) || (nextImage2 === nextImage1) || (nextImage2 === nextImage3)){
        nextImage2 = Math.floor(Math.random() * allImages.length);
        // console.log('Image 2', nextImage2)
    }
    var nextImage3 = Math.floor(Math.random() * allImages.length);
    while((nextImage3 === imageI3) || (nextImage3 === nextImage1) || (nextImage3 === nextImage2)){
        nextImage3 = Math.floor(Math.random() * allImages.length);
        // console.log('Image 3', nextImage3)
    }
    
    imageI1 = nextImage1;
    imageI2 = nextImage2;
    imageI3 = nextImage3;

    // add code to counter the number of times an image appears 
    imageElements[0].src = allImages[imageI1].imagePath;
    allImages[imageI1].timesShown++;

    imageElements[1].src = allImages[imageI2].imagePath;
    allImages[imageI2].timesShown++;
    // console.log(allImages[imageI3].timesShown);
    imageElements[2].src = allImages[imageI3].imagePath;
    allImages[imageI3].timesShown++;
    
    // end the operation and stop showing the use new images
    if(totalClicks >= rounds){
        // call constructor and store into local storage
        localStorage.setItem('localImage', JSON.stringify(allImages));
        // console.log('local image', allImages);
        // code to change footer message
        var footerElement = document.getElementsByTagName('footer')[0];
        if(footerElement.firstElementChild){
        footerElement.firstElementChild.remove();
        }
        footerElement.textContent = 'You have finished this product testing.';

        // code to remove event listener
        for(var i = 0; i < imageElements.length; i++){
            console.log('remove Event listen on the images');
            imageElements[i].removeEventListener('click', ifImageClicked);
          }
          
          // code to add and display product names and clicks on button press

        
        var buttonResults = document.getElementById('button');
        buttonResults.addEventListener('click', function(){
            chartResults();
            for(var i = 0; i < allImages.length; i++){
                var listItem = document.createElement('li');
                listItem.textContent = `${allImages[i].name2} was clicked on 
                 ${allImages[i].clickCounter} times. And appeared a total of ${allImages[i].timesShown} times.`;
                resultElements.appendChild(listItem);
            }
        })
    }
}
var resultElements = document.getElementById('results');
// code for the chart goes below

function chartResults(){
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imagesArray('name2'),
            datasets: [{
                label: 'votes',
                data: imagesArray('clickCounter'),
                backgroundColor: [
                    'rgba(70, 132, 194, 0.4)',
                    'rgba(0, 61, 122, 0.4)',
                    'rgba(60, 143, 78, 0.4)',
                    'rgba(162, 0, 255, 0.4)',
                    'rgba(85, 40, 110, 0.4)',
                    'rgba(0, 255, 149, 0.4)',
                    'rgba(229, 255, 0, 0.4)',
                    'rgba(241, 250, 157, 0.4)',
                    'rgba(255, 115, 0, 0.4)',
                    'rgba(104, 58, 20, 0.4)',
                    'rgba(255, 0, 0, 0.4)',
                    'rgba(80, 79, 79, 0.4)',
                    'rgba(0, 89, 179, 0.4)',
                    'rgba(125, 188, 250, 0.4)',
                    'rgba(15, 177, 0, 0.4)',
                    'rgba(0, 0, 0, 0.4)',
                    'rgba(108, 78, 163, 0.4)',
                    'rgba(25, 0, 71, 0.4)',
                    'rgba(17, 0, 255, 0.4)',
                    'rgba(222, 180, 73, 0.4)'
                ],
                borderColor: [
                    'rgba(70, 132, 194, 1)',
                    'rgba(0, 61, 122, 1)',
                    'rgba(60, 143, 78, 1)',
                    'rgba(162, 0, 255, 1)',
                    'rgba(85, 40, 110, 1)',
                    'rgba(0, 255, 149, 1)',
                    'rgba(229, 255, 0, 1)',
                    'rgba(241, 250, 157, 1)',
                    'rgba(255, 115, 0, 1)',
                    'rgba(104, 58, 20, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(80, 79, 79, 1)',
                    'rgba(0, 89, 179, 1)',
                    'rgba(125, 188, 250, 1)',
                    'rgba(15, 177, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(108, 78, 163, 1)',
                    'rgba(25, 0, 71, 1)',
                    'rgba(17, 0, 255, 1)',
                    'rgba(222, 180, 73, 1)' 
                ],
                borderWidth: .5
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        precision: 0,
                        beginAtZero: true
                    }
                }]
             }
         }
    });

    }




// functions to add and remove an event listener
for(var i = 0; i < imageElements.length; i++){
    console.log('Event listen on the images');
    imageElements[i].addEventListener('click', ifImageClicked); 
  }
 
// function to create a list of results when the view results button is clicked. 

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







    // figure out logic to stop repeat images in next round
     
    // for(var i = 0; i < 3; i++){
    //     if (imageI1.name2 === nextImage1.name2 || imageI1.name2 === nextImage2.name2 || imageI1.name2 === nextImage3.name2){
    //         nextImage1 = Math.floor(Math.random() * allImages.length);
    //         console.log('Image 1', nextImage1)
    //         console.log('Image I:', imageI1)
    //     }
    //     if (imageI2.name2 === nextImage1.name2 || imageI2.name2 === nextImage2.name2 || imageI2.name2 === nextImage3.name2){
    //         nextImage2 = Math.floor(Math.random() * allImages.length);
    //         console.log('Image 2', nextImage2)
    //         console.log('Image I:', imageI2)
    //     }
    //     if (imageI3.name2 === nextImage1.name2 || imageI3.name2 === nextImage2.name2 || imageI3.name2 === nextImage3.name2){
    //         nextImage3 = Math.floor(Math.random() * allImages.length);
    //         console.log('Image 3', nextImage3)
    //         console.log('Image I:', imageI3)
    //     }
    // }