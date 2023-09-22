const Web3 = require('web3');
const utils = require("../test/helpers/utils");

async function main() {
    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://localhost:8545');

    // Retrieve accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    let [alice, bob, carl] = accounts;

    // Set up a web3 contract, representing the ApiDirectory Contract
    const address = '0xA88714E7457EfcBa302f7Ddc6f1d069d1B1AFcC0'; //Changes after each Contract deployment
    const abi = require('../build/contracts/ApiDirectory.json').abi;
    const contractInstance = new web3.eth.Contract(abi, address);

    // Get API on Point and Category
    const t = 1000000; 
    const in_point = await utils.askQuestion("Please provide a Coordinate > ");
    const point = await utils.transCoordinate(in_point, t);
    const category = await utils.askQuestion("Please provide an API Category > ");

    const gas_price = await contractInstance.methods.getApiWithCatAndCov(category, point).estimateGas({from: bob, gas: '6712390'});
    console.log(`Get API function call Gas price = ${gas_price}`);
 
    const api = await contractInstance.methods.getApiWithCatAndCov(category, point).call({from: bob, gas: gas_price});

    for (i=0; i<api.length; i++) {
        const no_empty_api = utils.removeEmptyStrings(api[i]);
        utils.iterateNested(no_empty_api);
        console.log('GOT API:\n'); 
        console.log(no_empty_api);
    }     
}

main();