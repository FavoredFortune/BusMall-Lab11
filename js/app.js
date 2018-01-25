'use strict';

//array to store all product images instances
ProductImages.allProducts = [];

//what are the global variables?
//global click counter(total votes) - number user clicks max of 25
ProductImages.totalClicks = 0;

//track previously displayed product for generating new product images
ProductImages.lastShown = [];

//access the table from DOM
var productTable = document.getElementById('product-data');

//access the section element for click events in the DOM
var sectionElement = document.getElementById('products-for-vote');

//assign votes per product into an empty array for showing total product votes in the chart and/or calculating % vote vs. displayed in the table - needed values for local storage to start with and then replace
var productVotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//assign display values per product to an empty array for showing total product show in the chart and or calculateing # vote vs displayed in the chart- needed values for local storage to start with and then replace
var productShown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//assign product names into an empty array so they can be used as labels in the chart
var productNames = [];

//declare a variable that is assigned the maximum number of votes/clicks per user
var maxVote = 8;

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

  //create a while loop to make sure that no images displayed in any set of 3 are the same and none of them are the same images as last time
  while (randomProduct1 === randomProduct2
    || randomProduct1 === randomProduct3
    || randomProduct2 === randomProduct3
    || ProductImages.lastShown.includes(randomProduct1)
    || ProductImages.lastShown.includes(randomProduct2)
    || ProductImages.lastShown.includes(randomProduct3)) {

    randomProduct1 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct2 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct3 = Math.floor(Math.random() * ProductImages.allProducts.length);
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

//create a function that manages clicks for products themselves and shows results when total clicks/votes for the page hit maximum
function manageClick(event){

  //count total clicks on a specific product image instance
  for(var i in ProductImages.allProducts){

    // increment times clicked for an product image object if it was clicked on the page
    if(event.target.alt === ProductImages.allProducts[i].imageName){
      ProductImages.allProducts[i].imageTimesClicked ++;

      //total click votes tracking for the page is incremented while still clicking/voting on the page
      ProductImages.totalClicks ++;
    }
  }
  //when the user has clicked/voted the maximum number of times, show results, store both votes and times show per product in an array in local storage
  if (ProductImages.totalClicks > maxVote){
    sectionElement.removeEventListener('click', manageClick);
    alert('Thanks for voting. Your results are below.');
    updateVotes();
    renderChart();
    makeHeaderRow();
    renderTable();

    //add all productVote array values to local storage after vote is complete
    localStorage.setItem('totalProductVotes',JSON.stringify(productVotes));
    localStorage.setItem('totalProductShowns',JSON.stringify(productShown));

  } else {

    //when the votes are still needed, generate new product image set of 3
    randomProductGen();
  }
}

//update # of votes and # of times shown in their respective arrays for each product instance when images are clicked on
function updateVotes(){
  for( var i in ProductImages.allProducts){
    productVotes[i] += ProductImages.allProducts[i].imageTimesClicked;
    productShown[i] += ProductImages.allProducts[i].imageTimesShown;
  }
}

//function to create and populate chart
function renderChart(){
  var context = document.getElementById('product-vote-chart').getContext('2d');

  //changing from my fun rainbow colors as referenced in readme.md to just two values from the same source to better differentiate votes vs displays/shows
  var chartColors1 = ['#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040','#404040',];

  var chartColors2 = ['#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff','#0040ff',];

  var voteChartData = {
    label: 'Votes per Product (cumulative)',
    data: productVotes,
    backgroundColor: chartColors1,
  };

  var shownChartData = {
    label: 'Times shown per product (cumulative)',
    data: productShown,
    backgroundColor: chartColors2,
  };

  var productInfo = {
    labels: productNames,
    datasets:[voteChartData,shownChartData]
  };

  var chartOptions = {
    scales: {
      yAxes:[{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  var productResultsChart = new Chart(context, {
    type:'bar',
    data: productInfo,
    options: chartOptions,
  });
}


//Bring back table to show product results including percentage click/show for research team
//create the table market research has request that shows # of votes, # times shown and % of votes/shown for each product

function renderTable(){

  //establish table content rows and cells (data cells)
  var tableRowElement = document.createElement('tr');
  var tableDataElement = document.createElement('td');

  //create row for each product that has data cells for votes, times shown and % click rate
  for(var i = 0; i < ProductImages.allProducts.length; i++){

    if(ProductImages.allProducts[i].imageTimesShown >= 1 && ProductImages.allProducts[i].imageTimesClicked > 0){

      tableRowElement = document.createElement('tr');
      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageName;
      console.log (ProductImages.allProducts[i].imageName);
      tableDataElement.appendChild(tableRowElement);
      productTable.appendChild(tableRowElement);


      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageTimesClicked;
      tableDataElement.appendChild(tableRowElement);

      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageTimesShown;
      tableDataElement.appendChild(tableRowElement);

      //calculate preference rate by dividing the number of times an item is clicked by the number of times the item is shown/displayed
      var a = ProductImages.allProducts[i].imageTimesClicked;
      var b = ProductImages.allProducts[i].imageTimesShown;
      var voteRate = Math.round(100 * (a / b) ) * 100 / 100;
      tableRowElement = document.createElement('td');
      tableRowElement.textContent = voteRate + ' %';
      tableDataElement.appendChild(tableRowElement);
    } else{
      tableRowElement = document.createElement('tr');
      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageName;
      tableDataElement.appendChild(tableRowElement);
      productTable.appendChild(tableRowElement);


      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageTimesClicked;
      tableDataElement.appendChild(tableRowElement);

      tableDataElement = document.createElement('td');
      tableDataElement.textContent = ProductImages.allProducts[i].imageTimesShown;
      tableDataElement.appendChild(tableRowElement);
      tableRowElement = document.createElement('td');
      tableRowElement.textContent = 'N/A';
      tableDataElement.appendChild(tableRowElement);
    }
    productTable.appendChild(tableRowElement);
  }
}

function makeHeaderRow(){

  //header for table of results about product votes
  var productName = document.createElement ('td');
  var tableRowElement = document.createElement('tr');

  productName.textContent = 'Product';
  tableRowElement.appendChild(productName);

  productTable.appendChild(tableRowElement);

  var timesVoted = document.createElement ('td');
  timesVoted.textContent = '# Votes';
  tableRowElement.appendChild(timesVoted);

  productTable.appendChild(tableRowElement);

  var timesShown = document.createElement ('td');
  timesShown.textContent = '# Times Shown';
  tableRowElement.appendChild(timesShown);

  productTable.appendChild(tableRowElement);

  var preferenceRate = document.createElement ('td');
  preferenceRate.textContent = 'Preference Rate %';
  tableRowElement.appendChild(preferenceRate);

  productTable.appendChild(tableRowElement);
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

//reset the productVote array start values to the final tally of this round of voting from the local storage
if(localStorage.totalProductShowns){
  productVotes = JSON.parse(localStorage.getItem('totalProductVotes'));
  productShown = JSON.parse(localStorage.getItem('totalProductShowns'));
}
//create event listener for clicks on images
sectionElement.addEventListener('click', manageClick);

//render the three images on the page load
randomProductGen();


