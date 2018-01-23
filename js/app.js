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
function ProductImages (imageName,imageSrcFilepath,altNameID){
  this.imageName = imageName;
  this.imageSrcFilepath = imageSrcFilepath;
  this.altNameID = altNameID;
  this.imageTimesClicked = 0;
  //add display counter this.randomImageDisplay
  this.imageTimesShown = 0;
  //add a product properity values for each instant to all products array - this approach leads to less global variables
  ProductImages.allProducts.push(this);
}
//Grab 3 different images the first time and increment object instance imageTimesShown

//render the images in the DOM that are random and not a repeat of previous image or each other

//event listener on the page for any image click

imgElement.addEventListener('click',function randomNu



//create random number generator for array and to use in the below method

function randomGoat(){
  //random number generator  to return a length of the Goat.allGoats array
  var randomIndex = Math.floor(Math.random() * Goat.allGoats.length);
  //use random number to display a goat at that random index
  imgElement.src = Goat.allGoats [randomIndex].srcFilepath;
}
//callback function for the event listener to randomly display a goat image

//invoke the callback on page load to show a random goat
randomGoat();

//create do while loop that when click happens it checks number of total clicks (if less than clickVotes, then generate new random numbers and generate new images) 




//create instances of each product (can store in variables but not doing in demo)
new Goat('img/cruisin-goat.jpg','Cruising Goat');
new Goat('img/kissing-goat.jpg','Kissing Goat');
new Goat('img/sassy-goat.jpg','Sassy Goat');
new Goat('img/smiling-goat.jpg', 'Smiling Goat');
new Goat ('img/sweater-goat.jpg','Sweater Goat');
