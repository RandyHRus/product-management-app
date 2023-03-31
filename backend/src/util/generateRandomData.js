/**
 * Script used to generate random product data
 * run using "node generateRandomData.js"
 * it will generate or override data.json file in current directory
 */

const fs = require('fs');

let count = 40;

const productNamePrefix = ["Cool", "Useful", "Fun", "Good", "confidential", "top secret"];
const productNameType = ["web app", "microservice", "management app", "web service", "plug-in"];
const productNameAudience = ["citizens", "government officials", "internal use only", "aliens", "people"];
const productNamePurpose = ["help people", "increase productivity", "manage business", "educate", "entertain"];

const firstNames = ['Fatima', 'Kai', 'Ayaan', 'Amara', 'Jamal', 'Sofia', 'Nabil', 'Carmen', 'Yara', 'Dante'];
const lastNames = ['Patel', 'Nguyen', 'Rodriguez', 'Kim', 'Johnson', 'Singh', 'Wong', 'Martinez', 'Lee', 'Gomez']

const methodologies = ["agile", "waterfall"];

function Product(productId, productName, productOwnerName, developers, scrumMasterName, startDate, methodology) {
    this.productId = productId;
    this.productName = productName;
    this.productOwnerName = productOwnerName;
    this.developers = developers;
    this.scrumMasterName = scrumMasterName;
    this.methodology = methodology;
}

function generateRandomName() {
    return getRandomItem(firstNames) + " " + getRandomItem(lastNames);
}

function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}

let result = [];

for (let i = 0; i < count; i++) {

    let productId = i;
    let productName = getRandomItem(productNamePrefix) +
        getRandomItem(productNameType) + "used by"
        getRandomItem(productNameAudience) + "to"
        getRandomItem(productNamePurpose);

    let productOwnerName = generateRandomName();

    let developersList = [];
    let developersCount = Math.ceil(Math.random() * 5);
    for (let i = 0; i < developersCount; i++) {
        let developerName = generateRandomName();
        developersList.push(developerName);
    }

    let scrumMasterName = generateRandomName();
    let startDate = "2023/03/25";
    let methodology = getRandomItem(methodologies);

    let newProduct = new Product(productId, productName, productOwnerName, developersList, scrumMasterName, startDate, methodology);

    result.push(newProduct);
}

fs.writeFile("productsData.json", JSON.stringify(result, null, 2), error => {
    if (error) {
        console.error(error);
    } else {
        console.log("date generated");
    }});