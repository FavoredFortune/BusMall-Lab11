'use strict';

//what are the global variables?
//global click counter - number user clicks required = 25
//global vote count (cycles) = 1
//previous random number array
//current random number array
clickCount = 1;
clickVotes = 25;
previousRandomNum = [];
currentRandomNum = [];

//array to store all product images
ProductImages.allProducts = [];
//make a constructor function for all product images
//-----methods go here so that each product instance inherits all properities
function ProductImages (imageName,imageSrcFilepath){
  this.imageName = imageName;
  this.imageSrcFilepath = imageSrcFilepath;
  this.imageTimesClicked = 0;
  //add display counter this.randomImageDisplay
  this.imageTimesShown = 0;
  //add a product properity values for each instant to all products array - this approach leads to less global variables
  ProductImages.allProducts.push(this);
}
//access each image element from the DOM


//create image element

//render the images in the DOM that are random and not a repeat of previous image or each other

//event listener on the page for any image click

imageElement.addEventListener('click',randomNumGen);

//create random number generator for array and to use in the below method

function randomNumGen(){
  //random number generator  to return a length of the ProductImage array
 
  //use random number to display a product at that random index
  imgElement.src = Goat.allGoats[randomIndex].srcFilepath;
}
//callback function for the event listener to randomly display a goat image

//invoke the callback on page load to show a random goat


//create do while loop that when click happens it checks number of total clicks (if less than clickVotes, then generate new random numbers and generate new images) 




//create instances of each product (can store in variables but not doing in demo)
new ProductImages('bag','img/bag.jpg');
new ProductImages('banana', 'img/banana.jpg');
new ProductImages('bathroom', 'img/bathroom.jpg');
new ProductImages('boots', 'img/boots.jpg');
new ProductImages('breakfast', 'img/breakfast.jpg');
new ProductImages('bubblegum', 'img/bubblegum.jpg');
new ProductImages('chaircthulhu', 'img/chaircthulhu.jpg');
new ProductImages('cthulhu', 'img/cthulhu.jpg');
new ProductImages('dog-duck', 'img/dog-duck.jpg');
new ProductImages('dragon', 'img/dragon.jpg');
new ProductImages('pen', 'img/pen.jpg');
new ProductImages('pet-sweep', 'img/pet-sweep.jpg');
new ProductImages('scissors', 'img/scissors.jpg');
new ProductImages('shark', 'img/shark.jpg');
new ProductImages('sweep', 'img/sweep.jpg');
new ProductImages('tauntaun', 'img/tauntaun.jpg');
new ProductImages('unicorn', 'img/unicorn.jpg');
new ProductImages('usb', 'img/usb.jpg');
new ProductImages('water-can', 'img/water-can.jpg');
new ProductImages('wine-glass', 'img/wine-glass.jpg');


