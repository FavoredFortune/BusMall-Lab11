'use strict';

//array to store all product images instances
ProductImages.allProducts = [];

//what are the global variables?
//global click counter(total votes) - number user clicks max of 25
ProductImages.totalClicks = 0;

//track previously displayed product for generating new product images
ProductImages.lastShown = [];

//access the section element for click events in the DOM
var sectionElement = document.getElementById('products-for-vote');

//assign votes per product into an empty array for showing total product votes in the chart and/or calculating % vote vs. displayed in the table

var productVotes = [];

//assign product names into an empty array so they can be used as labels in the chart

var productNames = [];

//declare a variable that is assigned the maximum number of votes/clicks per user

var maxVote = 24;

//make a constructor function for all product images
//-----methods go here so that each product instance inherits all properities
function ProductImages (imageName,imageSrcFilepath){
  this.imageName = imageName;
  this.imageSrcFilepath = imageSrcFilepath;
  this.imageTimesClicked = 0;
  this.imageTimesShown = 0;
  //add a product properity values for each instance to all products array - this approach leads to less global variables
  ProductImages.allProducts.push(this);
  //assign index value names for each instance into an empty array for reporting
  productNames.push(this.imageName);
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
  while (randomProduct1 === randomProduct2
    || randomProduct1 === randomProduct3
    || randomProduct2 === randomProduct3
    || ProductImages.lastShown.includes(randomProduct1)
    || ProductImages.lastShown.includes(randomProduct2)
    || ProductImages.lastShown.includes(randomProduct3)) {
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

    // increment times clicked for an product image object if it was clicked on the page
    if(event.target.alt === ProductImages.allProducts[i].imageName){
      ProductImages.allProducts[i].imageTimesClicked ++;
      console.log(ProductImages.allProducts[i].imageTimesClicked);

      //total click votes tracking
      ProductImages.totalClicks ++;
      console.log (ProductImages.totalClicks);
    }
  }
  if (ProductImages.totalClicks > maxVote){
    sectionElement.removeEventListener('click', manageClick);
    alert('Thanks for voting. Your results are below.');
    updateVotes();
    renderChart();
  } else {
    randomProductGen();
  }
}

//update # of votes for each product instance
function updateVotes(){
  for( var i in ProductImages.allProducts){
    productVotes[i] = ProductImages.allProducts[i].imageTimesClicked;
  }
}

//Nixed results table in favor of today's new requirement - a chart

//function to create and populate chart
function renderChart(){
  var context = document.getElementById('product-vote-chart').getContext('2d');

  //colors don't seem to work, tried background color as the element and fill color, but keeping here because it doesn't break anything and it might work, somehow, someday
  var chartColors = ['#ff0000', '#ff4000', '#ff8000', '#ffbf00', '#ffff00', '#bfff00', '#80ff00', '#40ff00', '#00ff00', '#00ff40', '#00ff80', '#00ffbf', '#00ffff', '#00bfff', '#0080ff', '#0040ff', '#0000ff', '#4000ff', '#8000ff', '#bf00ff'];

  var productVoteChart = new Chart(context, {
    type:'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes Per Product by User',
        data: productVotes,
        backgroundColor: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes:[{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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

//render the three images on the page load
randomProductGen();