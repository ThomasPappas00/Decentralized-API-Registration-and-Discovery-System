// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./SharedStructs.sol";
import "./Functionality.sol";

/// @title An API Directory for API producers and consumers focused on Smart Cities
/// @author Thomas A. Pappas
/// @notice This Contract allows API producers to register their Smart City API and consumers to search for them based on category and spatial position
/// @dev This Contract is dependent on the Functionality and SharedStructs libraries and uses functions and structures from them
contract ApiDirectory {
    
    /// @notice Fires each time a new API is registered 
    event NewAPIRegistered(string title, string category);
    /// @notice Fires upon a payable function call and the payment of API producers from a consumer
    event GotPaid(Functionality.API[] returnApiListing);

    /// @notice The array that holds all the APIs registered
    /// @dev Has a dynamic length as an array stored in storage
    Functionality.API[] public apiListings;

    /// @notice Maps the id of an API to the producer address
    mapping (uint => address) public apiToProducer; 
    /// @notice Maps the producer address to the total count of APIs they produced
    mapping (address => uint) producerApiCount;
 
    /// @notice Register a new API based on the OpenAPI-Swagger specification
    /// @dev The non string parameter data types are inherited from the SharedStructs library. Emits event
    function createApi(string memory _openapi, SharedStructs.Info memory _info, 
    SharedStructs.Server memory _servers, string memory _paths, SharedStructs.Security memory _security, 
    string memory _components, SharedStructs.Tags memory _tags, SharedStructs.ExternalDocs memory _externalDocs, 
    string memory _x_category, SharedStructs.Coverage memory _x_coverage) 
    public {
        uint id = apiListings.length;
        apiListings.push(Functionality.API(id, _openapi, _info, _servers, _paths, _security, 
        _components, _tags, _externalDocs, _x_category, _x_coverage, msg.sender)); 
        apiToProducer[id] = msg.sender;
        producerApiCount[msg.sender]++;
        emit NewAPIRegistered(_info.title, _x_category);
    }

    function getApiCount() public view returns (uint) {
        return producerApiCount[msg.sender];
    }

    function getOwnerOf(uint _id) public view returns (address) {
        return apiToProducer[_id];
    }

    /// @notice Finds the APIs that are used for the category provided
    /// @dev The subset of apiListings that is returned (array) is stored in memory
    /// @param _x_category The category the API consumer provides
    /// @return returnApiListing The array of the APIs that have the specified category 
    function getApiWithCategory(string memory _x_category) public view returns (Functionality.API[] memory) {
        return(Functionality.getApiOnCategory(_x_category, apiListings));
    }

    /// @notice Same functionality as the getApiWithCategory(), but searches based upon coordinates (coverage)
    /// @dev Computes if the point given is inside a API coverage area and returns the APIs
    /// @param point The coordinate provided to which we want to find APIs. Has lat and lng fields. The values are int type because Solidity does not support floating-point numbers 
    function getApiWithCoverage(SharedStructs.Coordinate memory point) public view returns (Functionality.API[] memory){
        return (Functionality.getApiOnCoverage(point, apiListings));
    } 

    /// @notice Compines the search based upon category and coverage
    function getApiWithCatAndCov(string memory _x_category, SharedStructs.Coordinate memory point) public view returns (Functionality.API[] memory) {
        return (Functionality.getApiOnCatAndCov(_x_category, point, apiListings));
    }

    /// @notice Extends the above functionality of finding APIs based on coordinates with the payment of the API producers which APIs are returned
    /// @dev Requires 3 ether from the caller to proceede execution (payment). Calls function that pays the producers and returns APIs and then - 
    /// @dev -returns the data in the form of event becase it is a payable function and cannot have return statement. 
    function getApiWithCoveragePayable(SharedStructs.Coordinate memory point) public payable {
        require(msg.value == 3 ether);
        emit GotPaid(Functionality.getApiOnCoveragePayable(point, apiListings));
    }
}





