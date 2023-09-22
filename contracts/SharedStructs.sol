// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/// @title The necessary structures to define an API, based on Swagger
/// @author Thomas A. Pappas
library SharedStructs {
    struct Info{
        string version;
        string title;
        string description;
        string termsOfService;
        Contact contact;
        Licence license;
    }

    struct Contact {
        string name;
        string url;
        string email;
    }

    struct Licence {
        string name;
        string url;
    }

    struct Server {
        string url;
        string description;
        ServerVariableObject variables;
    }

    struct ServerVariableObject {
        string name;
        string[] server_enum;
        string description;
        string server_default;
    }

    struct OAuth_scopes {
        string name;
        string description;
    }

    struct OAuth_flow {
        string flow_type;
        string authorizationUrl;
        string tokenUrl;
        string refreshUrl;
        OAuth_scopes scopes;
    }

    struct SecurityScheme {
        string security_type;
        string description;
        string name;
        string security_in;
        string scheme;
        string bearerFormat;
        OAuth_flow flows;
        string openIdConnectUrl; 
    }

    struct Security {
        string name;
        SharedStructs.SecurityScheme mechanism;
    }

    struct Tags {
        string name;
        string description;
        ExternalDocs externalDocs;
    }

    struct ExternalDocs {
        string description;
        string url;
    }

    struct Coverage {
        Coordinate north;
        Coordinate south;
        Coordinate east;
        Coordinate west;
    }

    struct Coordinate {
        int256 lat;
        int256 lng;
    }

}

