'use strict';

//array to store all product images instances
ProductImages.allProducts = [];

//what are the global variables?
//global click counter(total votes) - number user clicks max of 25
ProductImages.totalClicks = 0;

//track previously displayed product for generating new product images
ProductImages.lastShown = [];

//access the ul element from the DOM
var ulElement = document.getElementById('product-images');

//access the section element for click events
var sectionElement = document.getElementById('products-for-vote');

//access to the table
var allProducts = document.getElementById('product-data');

//store votes per product for calculating % vote vs. displayed

var productVotes = [];


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
var product1Element = document.getElementById('product1');
var product2Element = document.getElementById('product2');
var product3Element = document.getElementById('product3');

//create random image generator for array and to use in the below functions

function randomProductGen(){
  //random number generator  to return a length of the ProductImage array
  var randomProduct1 = Math.floor(Math.random() * ProductImages.allProducts.length);
  var randomProduct2 = Math.floor(Math.random() * ProductImages.allProducts.length);
  var randomProduct3 = Math.floor(Math.random() * ProductImages.allProducts.length);

  console.log ('before',randomProduct1, randomProduct2, randomProduct3);
  console.log ('before',ProductImages.lastShown);

  //create a while loop to make sure that no images displayed in any set of 3 are the same and none of them are the same images as last time
  while (randomProduct1 === randomProduct2 || randomProduct1 === randomProduct3 || randomProduct2 === randomProduct3 || ProductImages.lastShown.includes(randomProduct1) || ProductImages.lastShown.includes(randomProduct2) || ProductImages.lastShown.includes(randomProduct3)) {
    console.log ('Duplicate seen');

    randomProduct1 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct2 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct3 = Math.floor(Math.random() * ProductImages.allProducts.length);

    console.log (randomProduct1, randomProduct2, randomProduct3);
    console.log (ProductImages.lastShown);
  }

  //use random number to show a product three times
  product1Element.src = ProductImages.allProducts[randomProduct1].imageSrcFilepath;
  product1Element.alt = ProductImages.allProducts[randomProduct1].imageName;

  product2Element.src = ProductImages.allProducts[randomProduct2].imageSrcFilepath;
  product2Element.alt = ProductImages.allProducts[randomProduct2].imageName;

  product3Element.src = ProductImages.allProducts[randomProduct3].imageSrcFilepath;
  product3Element.alt = ProductImages.allProducts[randomProduct3].imageName;

  //increment the number of times each product image was shown
  ProductImages.allProducts[randomProduct1].imageTimesShown ++;
  ProductImages.allProducts[randomProduct2].imageTimesShown ++;
  ProductImages.allProducts[randomProduct3].imageTimesShown ++;

  //track last products shown so they aren't repeated in next refresh of page

  ProductImages.lastShown[0] = randomProduct1;
  ProductImages.lastShown[1] = randomProduct2;
  ProductImages.lastShown[2] = randomProduct3;
}

//create a function that manages clicks for products themselves

function manageClick(event){

  //count total clicks on a specific product image instance
  for(var i in ProductImages.allProducts){
    if(event.target.alt === ProductImages.allProducts[i].imageName){
      ProductImages.allProducts[i].imageTimesClicked ++;
      console.log(ProductImages.allProducts[i].imageTimesClicked);

      //total click votes tracking
      ProductImages.totalClicks ++;
      console.log (ProductImages.totalClicks);
    }
  }
  if (ProductImages.totalClicks > 6){
    sectionElement.removeEventListener('click', manageClick);
    alert('Thanks for voting your results are below.');
    updateVotes();
    makeHeaderRow();
    renderTable();
  } else {
    randomProductGen();
  }
}

//update # of votes fore each product instance
function updateVotes(){
  for( var i in ProductImages.allProducts){
    productVotes[i] = ProductImages.allProducts[i].imageTimesClicked;
  }
}

//create the table market research has request that shows # of votes, # times shown and % of votes/shown for each product

function renderTable(){

  //header for table of results about product votes
  var tableRowElement = document.createElement('tr');
  var tableDataElement = document.createElement('td');

  //rows labels of each product name


  //create data cell for votes  and times shown and %

  for(var i in ProductImages.allProducts){
    tableDataElement = document.createElement('tc');
    tableDataElement.textContent = ProductImages.allProducts[i].imageName;
    tableDataElement.appendChild(tableRowElement);
    allProducts.appendChild(tableRowElement);

    tableDataElement = document.createElement('td');
    tableDataElement.textContent = ProductImages.allProducts[i].imageTimesClicked;
    tableDataElement.appendChild(tableRowElement);
    allProducts.appendChild(tableRowElement);

    tableDataElement = document.createElement('td');
    tableDataElement.textContent = ProductImages.allProducts[i].imageTimesShown;
    tableDataElement.appendChild(tableRowElement);
    allProducts.appendChild(tableRowElement);

    if(ProductImages.allProducts[i].imageTimesShown >= 1 && ProductImages.allProducts[i].imageTimesClicked > 0){
      var a = ProductImages.allProducts[i].imageTimesClicked;
      var b = ProductImages.allProducts[i].imageTimesShown;
      var voteRate = Math.round(100 * (a / b) ) * 100 / 100;
      tableRowElement = document.createElement('td');
      tableRowElement.textContent = voteRate + ' %';
      tableDataElement.appendChild(tableRowElement);
    } else{
      tableRowElement = document.createElement('td');
      tableRowElement.textContent = 'N/A';
      tableDataElement.appendChild(tableRowElement);
    }
    allProducts.appendChild(tableRowElement);
  }
}

function makeHeaderRow(){
  var productName = document.createElement ('td');
  var tableRowElement = document.createElement('tr');

  productName.textContent = 'Product';
  tableRowElement.appendChild(productName);

  var timesVoted = document.createElement ('td');
  timesVoted.textContent = '# Votes';
  tableRowElement.appendChild(timesVoted);

  var timesShown = document.createElement ('td');
  timesShown.textContent = '# Times Shown';
  tableRowElement.appendChild(timesShown);

  var preferenceRate = document.createElement ('td');
  preferenceRate.textContent = '% Chosen vs. Shown';
  tableRowElement.appendChild(preferenceRate);


  allProducts.appendChild(tableRowElement);
}

//create instances of each product (can store in variables but not doing in demo)
new ProductImages('bag','img/bag.jpg');
new ProductImages('banana', 'img/banana.jpg');
new ProductImages('bathroom', 'img/bathroom.jpg');
new ProductImages('boots', 'img/boots.jpg');
new ProductImages('breakfast', 'img/breakfast.jpg');
new ProductImages('bubblegum', 'img/bubblegum.jpg');
new ProductImages('chair', 'img/chair.jpg');
new ProductImages('cthulhu', 'img/cthulhu.jpg');
new ProductImages('dog-duck', 'img/dog-duck.jpg');
new ProductImages('dragon', 'img/dragon.jpg');
new ProductImages('pen', 'img/pen.jpg');
new ProductImages('pet-sweep', 'img/pet-sweep.jpg');
new ProductImages('scissors', 'img/scissors.jpg');
new ProductImages('shark', 'img/shark.jpg');
new ProductImages('sweep', 'img/sweep.png');
new ProductImages('tauntaun', 'img/tauntaun.jpg');
new ProductImages('unicorn', 'img/unicorn.jpg');
new ProductImages('usb', 'img/usb.gif');
new ProductImages('water-can', 'img/water-can.jpg');
new ProductImages('wine-glass', 'img/wine-glass.jpg');

//create event

sectionElement.addEventListener('click', manageClick);

//render the three images on the page

randomProductGen();