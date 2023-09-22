// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./SharedStructs.sol";

/// @title The provided functionality and API data structure for the API Directory in the form of a library
/// @author Thomas A. Pappas
/// @notice Provides the functions and API data structure to make a API Directory smart contract
/// @dev This library is developed for modularity purposes and because at the time of developing (Feb 2023), in Solidity, the maximum size of a contract is restricted to 24 KB
library Functionality {

    /// @notice Find APIs based on category
    /// @dev Sets the length of the return array and then populates that array with APIs
    /// @param apiListings The API[] array based on which the search will be done
    /// @return returnApiListing Subset of apiListings
    function getApiOnCategory(string memory _x_category, API[] memory apiListings) public pure returns (API[] memory) {
        uint len = getArrayLength(_x_category, apiListings);
        API[] memory returnApiListing = new API[](len);
        uint k = 0;
        for (uint i = 0; i < apiListings.length; i++) {        
            if (keccak256(abi.encodePacked(apiListings[i].x_category)) == keccak256(abi.encodePacked(_x_category))){      
                returnApiListing[k] = apiListings[i];
                k++;
            }       
        }
        return returnApiListing;
    }

    /// @notice Computes the length of the result array, because memory array cannot have dynamic length
    /// @dev You can compare strings by hashing the packed encoding values of the string
    function getArrayLength(string memory keyword, API[] memory apiListings) internal pure returns (uint) {
        uint count;
        for (uint i = 0; i < apiListings.length; i++) {        
            if (keccak256(abi.encodePacked(apiListings[i].x_category)) == keccak256(abi.encodePacked(keyword))){      
                count++;
            }       
        }
        return count;
    }

    /// @notice Finds if single point (coordinate) is inside rectangle area specified by most north, south, east and west points 
    /// @dev For north-south only the latitude should be compared. For east-west only the longitude should be compared.
    function checkPointInside(SharedStructs.Coordinate memory point, SharedStructs.Coverage memory rect) internal pure returns (bool) {
        if(((rect.south.lat < point.lat) && (point.lat < rect.north.lat)) && ((rect.west.lng < point.lng) && (point.lng < rect.east.lng))){
            return true;
        }
        return false;
    }

    /// @notice Find APIs based on coverage
    /// @dev Sets the length of the return array and then populates that array with APIs
    /// @param point The coordinate provided to which we want to find APIs. Has lat and lng fields. 
    function getApiOnCoverage(SharedStructs.Coordinate memory point, API[] memory apiListings) public pure returns (API[] memory) {
        uint count;
        for (uint i = 0; i < apiListings.length; i++) {        
            if (checkPointInside(point, apiListings[i].x_coverage)){      
                count++;
            }       
        }
        
        API[] memory returnApiListing = new API[](count);
        uint k = 0;
        for (uint i = 0; i < apiListings.length; i++) {        
            if (checkPointInside(point, apiListings[i].x_coverage)){      
                returnApiListing[k] = apiListings[i];
                k++;
            }       
        }
        return returnApiListing;
    } 

    /// @notice Combines searching upon catecory and coverage
    /// @dev Return one array with getApiOnCategory() and then a subset of that array with getApiOnCoverage()
    function getApiOnCatAndCov(string memory _x_category, SharedStructs.Coordinate memory point, API[] memory apiListings) public pure returns (API[] memory){
        return getApiOnCoverage(point, getApiOnCategory(_x_category, apiListings));
    }

    /// @notice Finds the APIs based on coverage and pays the producers equally
    /// @dev Balance is the caller Contract's balance. It should always be equal to the payment the consumers gave on the function call.- 
    /// @dev -It should not accumulate ether. Then, the Contract pays equally the API consumers' addresses the amount it recieved on call.
    function getApiOnCoveragePayable(SharedStructs.Coordinate memory point, API[] memory apiListings) public returns (API[] memory) {
        uint count;
        for (uint i = 0; i < apiListings.length; i++) {        
            if (checkPointInside(point, apiListings[i].x_coverage)){      
                count++;
            }       
        }
        
        API[] memory returnApiListing = new API[](count);
        uint k = 0;
        uint balance = address(this).balance; 
        for (uint i = 0; i < apiListings.length; i++) {        
            if (checkPointInside(point, apiListings[i].x_coverage)){      
                returnApiListing[k] = apiListings[i];
                payable(returnApiListing[k].x_api_producer).transfer(balance/count);
                k++;
            }       
        }
        return returnApiListing;
    } 

    /// @notice The API data structure based and extended on Swagger specification. A contract can freely use a subset or extend it
    struct API {
        uint id;
        string openapi;
        SharedStructs.Info info;
        SharedStructs.Server servers;
        string paths;
        SharedStructs.Security security;
        string components;
        SharedStructs.Tags tags;
        SharedStructs.ExternalDocs externalDocs;
        string x_category;
        SharedStructs.Coverage x_coverage;
        address x_api_producer;
    }
}