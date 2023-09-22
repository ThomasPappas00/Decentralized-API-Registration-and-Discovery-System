const Web3 = require('web3');
const utils = require("../test/helpers/utils");

async function main() {
    // Set up web3 object, connected to the local development network
    const web3 = new Web3('http://localhost:8545');

    // Retrieve accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    let [alice, bob, carl] = accounts;

    // Set up a web3 contract, representing the ApiDirectory Contract
    const address = '0xA88714E7457EfcBa302f7Ddc6f1d069d1B1AFcC0';
    const abi = require('../build/contracts/ApiDirectory.json').abi;
    const contractInstance = new web3.eth.Contract(abi, address);

    // Get API on Point and Category
    const t = 1000000; 
    const in_point = await utils.askQuestion("Please provide a Coordinate > ");
    const point = await utils.transCoordinate(in_point, t);

    // Balances before call
    let contract_balance_before = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    let alice_balance_before = web3.utils.fromWei(await web3.eth.getBalance(alice), "ether");
    let bob_balance_before = web3.utils.fromWei(await web3.eth.getBalance(bob), "ether");
    let carl_balance_before = web3.utils.fromWei(await web3.eth.getBalance(carl), "ether"); 

    // Call
    let fee = web3.utils.toWei('3', "ether");
    const gas_price = await contractInstance.methods.getApiWithCoveragePayable(point).estimateGas({from: bob, gas: '6712390', value: fee});
    console.log(`Get API function call Gas price = ${gas_price}`); 
    const params = {from: bob, gas: gas_price, value: fee};
    let sendTx = await contractInstance.methods.getApiWithCoveragePayable(point).send(params);

    // Print APIs
    const api = sendTx.events.GotPaid.returnValues.returnApiListing; 
    for (i=0; i<api.length; i++) {
        const no_empty_api = utils.removeEmptyStrings(api[i]);
        utils.iterateNested(no_empty_api);
        console.log('GOT API:\n'); 
        console.log(no_empty_api);
    }     
  
    // Balances after call
    let contract_balance_after = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    let alice_balance_after = web3.utils.fromWei(await web3.eth.getBalance(alice), "ether");
    let bob_balance_after = web3.utils.fromWei(await web3.eth.getBalance(bob), "ether");
    let carl_balance_after = web3.utils.fromWei(await web3.eth.getBalance(carl), "ether");

    console.log("Contract balance before trans: ");
    console.log(contract_balance_before);
    console.log("Contract balance after trans: ");
    console.log(contract_balance_after);
    console.log("Alice balance before trans: ");
    console.log(alice_balance_before);
    console.log("Alice balance after trans: ");
    console.log(alice_balance_after);
    console.log("Bob balance before trans: ");
    console.log(bob_balance_before);
    console.log("Bob balance after trans: ");
    console.log(bob_balance_after);
    console.log("Carl balance before trans: ");
    console.log(carl_balance_before);
    console.log("Carl balance after trans: ");
    console.log(carl_balance_after);  
}

main();