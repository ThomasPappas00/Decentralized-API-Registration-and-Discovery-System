const Web3 = require('web3');
const utils = require("../test/helpers/utils");
const example = require("../test/helpers/api_examples");
const api1 = example.api_1;
const api2 = example.api_2;
const api3 = example.api_3;

async function main() {
    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://localhost:8545');

    // Retrieve accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    let [alice, bob, carl] = accounts;

    // Set up a web3 contract, representing the ApiDirectory Contract
    const address = '0xA88714E7457EfcBa302f7Ddc6f1d069d1B1AFcC0';     //Changes after each Contract deployment
    const abi = require('../build/contracts/ApiDirectory.json').abi;
    const contractInstance = new web3.eth.Contract(abi, address);

    let api;
    const input = await utils.askQuestion("Please provide an API example > ");
    if (input == "api1"){
        api = api1;
    } else if (input == "api2"){
        api = api2;
    }
    else if (input == "api3"){
        api = api3;
    }

    // Add API specifications
    await contractInstance.methods.createApi(api.openapi, api.info, api.servers, api.paths,
        api.security, api.components, api.tags, api.externalDocs, api.x_category, api.x_coverage).send({from: alice, gas: '6712390'});

    console.log(`API CREATED: ${api.info.title}\n`); 
}

main();