const ApiDirectory = artifacts.require("ApiDirectory");
const expect = require('chai').expect;
const utils = require("./helpers/utils");
const example = require("./helpers/api_examples");
const api1 = example.api_1;
const api2 = example.api_2;
const api3 = example.api_3;

contract("ApiDirectory", (accounts) => {
    let [alice, bob, carl] = accounts; // Accounts array holds the 10 test accounts on ganache
    let contractInstance;
    beforeEach(async () => {     
        contractInstance = await ApiDirectory.new(); // Make a new contract abstraction instance for every test
    });

    xit("should be able to create an API entry of coverage: 'patras'", async () => {
        const result = await contractInstance.createApi(api1.openapi, api1.info, api1.servers, api1.paths,
        api1.security, api1.components, api1.tags, api1.externalDocs, api1.x_category, api1.x_coverage, {from: alice});

        const api = await contractInstance.getApiWithCoverage("patras");  // Deprecated 

        for (i=0; i<api.length; i++) {
            const keys_length = Object.keys(api[i]).length;
            const api_keys = Object.keys(api[i]).slice(Math.floor(keys_length/2), keys_length);
            console.log('api added keys:\n' + api_keys); 
        
            const no_empty_api = utils.removeEmptyStrings(api[i]);
            utils.iterateNested(no_empty_api);
            console.log('api added:\n'); 
            console.log(no_empty_api);
        }

        expect(result.receipt.status).to.equal(true);
        expect(result.logs[0].args.x_coverage).to.equal("patras");
    });

    xit("should be able to create an API entry of coverage in an Rectangle Area", async () => {
        const result = await contractInstance.createApi(api1.openapi, api1.info, api1.servers, api1.paths,
        api1.security, api1.components, api1.tags, api1.externalDocs, api1.x_category, api1.x_coverage, {from: alice});

        const count = await contractInstance.getApiCount({from: alice});
        const owner = await contractInstance.getOwnerOf(0, {from: alice});

        console.log(`Alice has ${count} APIs registered and the producer of API with id=0 is ${owner}`);
        expect(result.receipt.status).to.equal(true);
    });

    it("should be able to check Category && if Point is in Rectangle erea and then return APIs", async () => {
        const result1 = await contractInstance.createApi(api3.openapi, api3.info, api3.servers, api3.paths,
            api3.security, api3.components, api3.tags, api3.externalDocs, api3.x_category, api3.x_coverage, {from: alice});
    
        const result2 = await contractInstance.createApi(api2.openapi, api2.info, api2.servers, api2.paths,
                api2.security, api2.components, api2.tags, api2.externalDocs, api2.x_category, api2.x_coverage, {from: bob});
        
        const t = 1000000;
        const patras_center= {lat:38.24264*t, lng: 21.73073*t};
        const antirrio = {lat: 38.33192*t, lng: 21.74454*t};
        const vrachnaiika = {lat: 38.16730*t, lng: 21.67520*t};
        const panachaiko = {lat: 38.24136*t, lng: 21.84834*t};
        const psilalonia = {lat: 38.24070*t, lng: 21.73512*t};
        const agia = {lat: 38.26907*t, lng: 21.74487*t}
        const aigio = {lat: 38.23511*t, lng: 22.07048*t}

        const api = await contractInstance.getApiWithCatAndCov("SmartCity", aigio);

        for (i=0; i<api.length; i++) {
            const no_empty_api = utils.removeEmptyStrings(api[i]);
            utils.iterateNested(no_empty_api);
            console.log('api added:\n'); 
            console.log(no_empty_api);
        }  

        expect(result1.receipt.status && result2.receipt.status).to.equal(true);
    });

    xit("should be able to receive payment (in ether) for function call and pay API producers", async () => {
        const result1 = await contractInstance.createApi(api1.openapi, api1.info, api1.servers, api1.paths,
            api1.security, api1.components, api1.tags, api1.externalDocs, api1.x_category, api1.x_coverage, {from: alice});
    
        const result2 = await contractInstance.createApi(api2.openapi, api2.info, api2.servers, api2.paths,
                api2.security, api2.components, api2.tags, api2.externalDocs, api2.x_category, api2.x_coverage, {from: bob});     

        let contract_balance_before = web3.utils.fromWei(await web3.eth.getBalance(contractInstance.address), "ether");
        let alice_balance_before = web3.utils.fromWei(await web3.eth.getBalance(alice), "ether");
        let bob_balance_before = web3.utils.fromWei(await web3.eth.getBalance(bob), "ether");
        let carl_balance_before = web3.utils.fromWei(await web3.eth.getBalance(carl), "ether");

        let price = web3.utils.toWei('3', "ether");

        const t = 1000000;
        const patras_center= {lat:38.24264*t, lng: 21.73073*t};
        const call = await contractInstance.getApiWithCoveragePayable(patras_center, {from: carl, value: price});

        const api = call.logs[0].args.returnApiListing;
        for (i=0; i<api.length; i++) {
            const no_empty_api = utils.removeEmptyStrings(api[i]);
            utils.iterateNested(no_empty_api);
            console.log('api added:\n'); 
            console.log(no_empty_api);
        }  

        let contract_balance_after = web3.utils.fromWei(await web3.eth.getBalance(contractInstance.address), "ether");
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

        expect(result1.receipt.status && result2.receipt.status).to.equal(true);
    });

})