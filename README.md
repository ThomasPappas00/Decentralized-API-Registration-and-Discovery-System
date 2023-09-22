# Overview

The realization of IoT in smart cities faces a significant obstacle in the form of interoperability challenges inside and between the five distinct architectural/conceptual layers (sensing layer, network layer, middleware layer, application layer and business layer) that form information and data silos. This project focuses on the discoverability of Layer 3 platform systems by Layer 4 applications, without prior knowledge of them, in a complex city scenario.
<p align="center"><img src="https://github.com/ThomasPappas00/Decentralized-API-Registration-and-Discovery-System/assets/75483971/02600cc9-b051-4a41-b265-90e3e7ba5faa" width="400"/></p>


Layer 3 platforms abstract the sensor and networking layers from the end-user applications and are responsible for the registration, discovery and management of devices (sensors, actuators), security, semantics and communication management with other software systems. Generally, Layer 3 platforms expose RESTful northbound APIs, so Layer 4 applications can onboard and receive data and functionality. The proliferation of these APIs is a prominent issue and a common place for the accumulation of the API specifications of the platforms is necessary.

<p align="center"><img src="https://github.com/ThomasPappas00/Decentralized-API-Registration-and-Discovery-System/assets/75483971/23789ab5-7ec6-4898-a066-a98bd6e2c7b6" width="400"/></p>

A decentralized API Directory is proposed, that can be deployed in any Ethereum Virtual Machine (EVM) compatible public or private blockchain. This API Directory can be used as a common place for smart-city IoT platforms to publish their API specifications, formulated on the OpenAPI specification standard, and for end-user applications to discover them based on spatial location and desired smart-city category. Furthermore, taking advantage of the inherit financial nature of the Ethereum blockchain, a proposition is implemented to extend this solution to a payable version (where API consumers pay a fee to obtain the producers’ APIs) and therefore unfold a new smart city API marketplace.

--- 
**Problem example with two IoT stacks**

<p align="center"> <img src="https://github.com/ThomasPappas00/Decentralized-API-Registration-and-Discovery-System/assets/75483971/3095189a-bc32-418a-9c33-12cb262ab132" width="600"/> </p>
<br> <br>
**Architecture of the system and four types of interactions**
<p align="center"><img src="https://github.com/ThomasPappas00/Decentralized-API-Registration-and-Discovery-System/assets/75483971/ebd88fa2-2c94-4395-8935-6dde4c18c08c" width="600"/></p> 

---

[Thesis link](https://hdl.handle.net/10889/24723)

## Instructions
Start a private local Ethereum blockchain instance (127.0.0.1:8545) with tools like Ganache and add the _truffle-config.js_ file to the workspace. Run _$truffle migrate_ in the root folder to compile the smart contracts _(ApiDirectory.sol, Functionality.sol, SharedStructs.sol)_ and deploy them on the blockchain. Run _node producer.js_ in the _/scripts_ folder and provide an API specification. Run _node consumer.js_ in the _/scripts_ folder and provide a x,y location (lat, lon) and a smart-city category (Parking, etc.). A single or multiple OpenAPI specifications are returned in JSON format. Now, the Layer 4 application can onboard on the desired Layer 3 platform based the API specification. 

## License
[MIT](https://choosealicense.com/licenses/mit/)

