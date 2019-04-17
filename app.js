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
function ProductDetails(
  productName,
  filePath
) {
  this.productName = productName;
  this.filePath = filePath;
  this.numberOfClicks = 0;
  this.numberOfTimesDisplayed = 0;
}

//Create instances of the different Products available.
var bag = new ProductDetails('bag', 'img/bag.jpg');
var banana = new ProductDetails('banana', 'img/banana.jpg');
var boots = new ProductDetails('boots', 'img/boots.jpg');
var shark = new ProductDetails('shark', 'img/shark.jpg');
var sweep = new ProductDetails('sweep', 'img/sweep.png');
var watercan = new ProductDetails('water can', 'img/water-can.jpg');
var wineglass = new ProductDetails('wine glass', 'img/wine-glass.jpg');
var chair = new ProductDetails('chair', 'img/chair.jpg');
var cthulhu = new ProductDetails('cthulhu', 'img/cthulhu.jpg');
var unicorn = new ProductDetails('unicorn', 'img/unicorn.jpg');
var usb = new ProductDetails('usb', 'img/usb.gif');
var dragon = new ProductDetails('dragon', 'img/dragon.jpg');
var pen = new ProductDetails('pen', 'img/pen.jpg');
var scissors = new ProductDetails('scissors', 'img/scissors.jpg');

// Create an array of Objects.
var productsList = [
  bag,
  banana,
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
  wineglass
];

// Assigning variable names to each product displayed
var productLeft = document.getElementById('productLeft');
var productCenter = document.getElementById('productCenter');
var productRight = document.getElementById('productRight');

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

/**
 * Left product image click.
 */
function handleClickOnProductLeft() {
  productsList[randomNumLeft].numberOfClicks++;
  console.log('Left was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
  if (totalClicks === 25) {
    displayResults();
  }
}

/**
 * Center product image click
 */
function handleClickOnProductCenter() {
  productsList[randomNumCenter].numberOfClicks++;
  console.log('Center was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
  if (totalClicks === 25) {
    displayResults();
  }
}

/**
 * Right product image click.
 */
function handleClickOnProductRight() {
  productsList[randomNumRight].numberOfClicks++;
  console.log('Right was clicked');
  getImageGenerator();
  totalClicks += 1;
  console.log('The total number of clicks is ' + totalClicks);
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

var productDetailsTable = document.getElementById('product_details_table');

/**
 * Table displaying the final results.
 */
function displayResults() {
  productLeft.removeEventListener('click', handleClickOnProductLeft);
  productCenter.removeEventListener('click', handleClickOnProductCenter);
  productRight.removeEventListener('click', handleClickOnProductRight);

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
}
