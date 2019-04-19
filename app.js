/***********  Kushal Sinha Roy  **********************
Bus Mall Project - This would be used to predict the list
of all the products that would be available in the BusMall
catalog based on user selection.
*******************************************************/

'use strict';

/**
 * Constructor function for instantiating Product Detail object.
 * @param {*} productName
 * @param {*} filePath
 * @param {*} numberOfClicks
 * @param {*} numberOfTimesDisplayed
 */
function ProductDetails(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numberOfClicks = 0;
  this.numberOfTimesDisplayed = 0;
}

//Create instances of the different Products available.
var bag = new ProductDetails('bag', 'IMG/bag.jpg');
var banana = new ProductDetails('banana', 'IMG/banana.jpg');
var bathroom = new ProductDetails('bathroom', 'IMG/bathroom.jpg');
var breakfast = new ProductDetails('breakfast', 'IMG/breakfast.jpg');
var bubblegum = new ProductDetails('bubblegum', 'IMG/bubblegum.jpg');
var boots = new ProductDetails('boots', 'IMG/boots.jpg');
var shark = new ProductDetails('shark', 'IMG/shark.jpg');
var sweep = new ProductDetails('sweep', 'IMG/sweep.png');
var watercan = new ProductDetails('water can', 'IMG/water-can.jpg');
var wineglass = new ProductDetails('wine glass', 'IMG/wine-glass.jpg');
var chair = new ProductDetails('chair', 'IMG/chair.jpg');
var cthulhu = new ProductDetails('cthulhu', 'IMG/cthulhu.jpg');
var unicorn = new ProductDetails('unicorn', 'IMG/unicorn.jpg');
var usb = new ProductDetails('usb', 'IMG/usb.gif');
var dragon = new ProductDetails('dragon', 'IMG/dragon.jpg');
var pen = new ProductDetails('pen', 'IMG/pen.jpg');
var scissors = new ProductDetails('scissors', 'IMG/scissors.jpg');
var dogduck = new ProductDetails('dogduck', 'IMG/dog-duck.jpg');
var tauntaun = new ProductDetails('tauntaun', 'IMG/tauntaun.jpg');

// Create an array of Objects.
var productsList = [
  bag,
  banana,
  bathroom,
  breakfast,
  bubblegum,
  boots,
  chair,
  cthulhu,
  dragon,
  pen,
  scissors,
  shark,
  sweep,
  unicorn,
  usb,
  watercan,
  wineglass,
  dogduck,
  tauntaun
];

// Assigning variable names to each product displayed
var productLeft = document.getElementById('productLeft');
var productCenter = document.getElementById('productCenter');
var productRight = document.getElementById('productRight');
var resetPage = document.getElementById('reset');
var persistantData = document.getElementById('persistantdata');
var localStorageClear = document.getElementById('localstorageclear');

/* Create an event listener that
1. responds to the click on an image,
2. records the click to the object
3. randomly displays another set of images. */
productLeft.addEventListener('click', handleClickOnProductLeft);
productCenter.addEventListener('click', handleClickOnProductCenter);
productRight.addEventListener('click', handleClickOnProductRight);

// Global variables for storing random numbers, and total clicks.
var randomNumLeft,
  randomNumCenter,
  randomNumRight,
  totalClicks = 0;

// Calls getImageGenerator() for 1st time load.
getImageGenerator();

// Get the items for local storage
var clickData = localStorage.getItem('clickPersist');
var productData = localStorage.getItem('chartPersist');

// If the clicks exists, take the data from local storage.
if (clickData && productData) {
  totalClicks = parseInt(localStorage.getItem('clickPersist'));
  productsList = JSON.parse(localStorage.getItem('chartPersist'));
} else {
  totalClicks = 0;
}

/**
 * Left product image click.
 */
function handleClickOnProductLeft() {
  if (totalClicks > 0) {
    productsList = JSON.parse(localStorage.getItem('chartPersist'));
    totalClicks = parseInt(localStorage.getItem('clickPersist'));
  }
  productsList[randomNumLeft].numberOfClicks++;
  console.log('Left was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
  localStorage.setItem('chartPersist', JSON.stringify(productsList));
  localStorage.setItem('clickPersist', totalClicks);
  if (totalClicks === 25) {
    displayResults();
  }
}

/**
 * Center product image click
 */
function handleClickOnProductCenter() {
  if (totalClicks > 0) {
    productsList = JSON.parse(localStorage.getItem('chartPersist'));
    totalClicks = parseInt(localStorage.getItem('clickPersist'));
  }
  productsList[randomNumCenter].numberOfClicks++;
  console.log('Center was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
  localStorage.setItem('chartPersist', JSON.stringify(productsList));
  localStorage.setItem('clickPersist', totalClicks);
  if (totalClicks === 25) {
    displayResults();
  }
}

/**
 * Right product image click.
 */
function handleClickOnProductRight() {
  if (totalClicks > 0) {
    productsList = JSON.parse(localStorage.getItem('chartPersist'));
    totalClicks = parseInt(localStorage.getItem('clickPersist'));
  }
  productsList[randomNumRight].numberOfClicks++;
  console.log('Right was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
  localStorage.setItem('chartPersist', JSON.stringify(productsList));
  localStorage.setItem('clickPersist', totalClicks);
  if (totalClicks === 25) {
    displayResults();
  }
}

//Reusable function to creates a random integer
function generateRandomNumbers() {
  var randomNumber = Math.floor(Math.random() * productsList.length);
  return randomNumber;
}

/**
 * Generate 3 random images after each click.
 */
function getImageGenerator() {
  randomNumLeft = generateRandomNumbers();
  console.log(randomNumLeft);

  randomNumCenter = generateRandomNumbers();
  while (randomNumLeft === randomNumCenter) {
    randomNumCenter = generateRandomNumbers();
  }
  console.log(randomNumCenter);

  randomNumRight = generateRandomNumbers();
  while (
    randomNumRight === randomNumLeft ||
    randomNumRight === randomNumCenter
  ) {
    randomNumRight = generateRandomNumbers();
  }
  console.log(randomNumRight);

  productLeft.src = productsList[randomNumLeft].filePath;
  productsList[randomNumLeft].numberOfTimesDisplayed++;
  productCenter.src = productsList[randomNumCenter].filePath;
  productsList[randomNumCenter].numberOfTimesDisplayed++;
  productRight.src = productsList[randomNumRight].filePath;
  productsList[randomNumRight].numberOfTimesDisplayed++;
}

// Get Element for the voting table and graph
var productDetailsTable = document.getElementById('product_details_table');
var results = document.getElementById('results');

// Hide the results until user clicks 25 times.
results.style.display = 'None';

//Add event listners for the Buttons
resetPage.addEventListener('click', reloadPage);
persistantData.addEventListener('click', displayResults);
localStorageClear.addEventListener('click', clearLocalStorage);

/**
 * Generate the chart based on the above voting data taken by user.
 */
function generateChart() {
  var products = [];
  for (var i = 0; i < productsList.length; i++) {
    products.push(productsList[i].productName);
  }
  var clicks = [];
  for (var j = 0; j < productsList.length; j++) {
    clicks.push(productsList[j].numberOfClicks);
  }
  var timesDisplayed = [];
  for (var k = 0; k < productsList.length; k++) {
    timesDisplayed.push(productsList[k].numberOfTimesDisplayed);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [
        {
          backgroundColor: '#3e95cd',
          data: clicks,
          label: 'Number of Clicks'
        },
        {
          backgroundColor: '#8e5ea2',
          data: timesDisplayed,
          label: 'Number of Times Displayed'
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Voting Chart'
      }
    }
  });
}

/**
 * Table displaying the final results.
 */
function displayResults() {
  console.log('*** Total Clicks ***' + totalClicks);
  console.log('*** Total Product ***' + productsList);

  productLeft.removeEventListener('click', handleClickOnProductLeft);
  productCenter.removeEventListener('click', handleClickOnProductCenter);
  productRight.removeEventListener('click', handleClickOnProductRight);

  results.style.display = 'Block';

  var row;
  for (var i = 0; i < productsList.length; i++) {
    row = document.createElement('tr');
    row.innerHTML =
      '<td>' +
      productsList[i].productName +
      '</td>' +
      '<td>' +
      productsList[i].numberOfClicks +
      '</td>' +
      '<td>' +
      productsList[i].numberOfTimesDisplayed +
      '</td>';
    console.log('Create Table' + productsList[i].productName);
    productDetailsTable.appendChild(row);
  }

  // Call the generate Chart
  generateChart();
}

/**
 * Reload Page - This does not clear local storage.
 */
function reloadPage() {
  window.location.reload();
}

/**
 * Clear Local storage
 */
function clearLocalStorage() {
  console.log('Clearing local storage');
  var clearLocalStorage = window.confirm("Local storage will be cleared. Are you sure?");
    if(clearLocalStorage) {
        localStorage.clear();
    }
}
