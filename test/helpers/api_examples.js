const contact = {
    name: "API Support",
    url: "https://example.com/support",
    email: "support@example.com"
}

const license = {
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
}

const info = {
    version: "1.0.1",
    title: "Sample Smart App",
    description: "This is a sample server for a smart app.",
    termsOfService: "http://example.com/terms/",
    contact: contact,
    license: license
}

const server_variable_1 = {
    name: "username",
    description: "username for demo",
    server_enum: [""],
    server_default: "demo",
}

const server_variable_2 = {
    name: "port",
    description: "enums for port",
    server_enum: ["8443","443"],
    server_default: "8443"
}

const server_1 = {
    url: "https://development.e-aigio.com/v1",
    description: "Development server",
    variables: server_variable_1
}

const server_2 = {
    url: "https://producion.smart-app.com/v1",
    description: "The production API server",
    variables: server_variable_2
}

const Security_type = {
    apiKey: "apiKey", 
    http: "http", 
    oauth2: "oauth2", 
    openIdConnect: "openIdConnect"
}

const Security_in = {
    query: "query",
    header: "header",
    cookie: "cookie"
}

const OAuth_flow_type = {
    implicit: "implicit",
    password: "password",
    clientCredentials: "clientCredentials",
    authorizationCode: "authorizationCode"
}

const flow_1 = {
    flow_type: OAuth_flow_type.implicit,
    authorizationUrl: "https://example.com/api/oauth/",
    tokenUrl: "",
    refreshUrl: "",
    scopes: {name: "write:users", description: "modify users in your account"}
}

const mechanism_1 = {
    security_type: Security_type.oauth2,
    description: "Security mechanism for smart app",
    name: "",
    security_in: "",
    scheme: "",
    bearerFormat: "",
    flows: flow_1,
    openIdConnectUrl: "" 
}

const security_1 = {
    name: "OAuth for pet store",
    mechanism: mechanism_1
}

const tags_1 = {
    name: "device",
    description: "Device operations",
    externalDocs: {description: "", url: "http://example.com/device/"}
}

const externalDocs_1 = {
    description: "Follow the url for additional docs",
    url: "https://example.com/api/docs/"
}

const category = {
    SmartCity: "SmartCity",
    Parking: "Parking",
    Mobility: "Mobility",
    Streetlights: "Streetlights",
    Environment: "Environment",
    AdministrativeArea: "AdministrativeArea",
    CityObject: "CityObject",
    PointOfInterest: "PointOfInterest",
    Ports: "Ports"
}

const t = 1000000;
const coverage_1 = { // Patras City Coverage
    north: {lat: 38.30451*t, lng: 21.75231*t},
    south: {lat: 38.22357*t, lng: 21.72572*t},
    east: {lat: 38.25081*t, lng: 21.75501*t},
    west: {lat: 38.25051*t, lng: 21.71590*t}
}

const coverage_2 = {  // Peloponnese Region Coverage
    north: {lat: 38.34286*t, lng: 21.88044*t},
    south: {lat: 36.39620*t, lng: 22.47490*t},
    east: {lat: 37.47701*t, lng: 23.52010*t},
    west: {lat: 37.69443*t, lng: 21.05082*t}
}

const coverage_3 = {  // Aigio Coverage
    north: {lat: 38.26724*t, lng: 22.08399*t},
    south: {lat: 38.23125*t, lng: 22.08035*t},
    east: {lat: 38.24896*t, lng: 22.10909*t},
    west: {lat: 38.25053*t, lng: 22.04743*t}
}

const api_1 = {
    openapi: "openapi 3.0.3",
    info: info,
    servers: server_2,
    paths: "\redirect to server.url after authentication",
    security: security_1,
    components: "",
    tags: tags_1,
    externalDocs: externalDocs_1,
    x_category: category.Streetlights,
    x_coverage: coverage_1
}

const api_2 = {
    openapi: "openapi 3.0.1",
    info: {
        version: "v1",
        title: "Aigio-Service",
        description: "",
        termsOfService: "http://example.com/v2/terms/",
        contact: {name: "", url: "", email: ""},
        license: {name: "MIT license", url: "https://opensource.org/licenses/MIT"}
    },
    servers: server_1,
    paths: "\\",
    security: {
        name: "Basic Auth for service",
        mechanism: {
            security_type: Security_type.http,
            description: "",
            name: "",
            security_in: "",
            scheme: "Basic",
            bearerFormat: "JWT",
            flows: {
                flow_type: "",
                authorizationUrl: "",
                tokenUrl: "",
                refreshUrl: "",
                scopes: {name: "", description: ""}
            },
            openIdConnectUrl: "" 
        }
    },
    components: "",
    tags: {
        name: "",
        description: "",
        externalDocs: {description: "", url: ""}
    },
    externalDocs: {
        description: "Follow the url for additional docs",
        url: "https://example.com/api/docs/v2"
    },
    x_category: category.SmartCity,
    x_coverage: coverage_3
}

const api_3 = {
    openapi: "openapi 3.0.3",
    info: {
        version: "v1",
        title: "Patras Smart City Interoperability API",
        description: "This is a public API for the smart city of Patras for applications and IoT verticals",
        termsOfService: "https://smart-city-patras.com/v1/terms",
        contact: {name: "Mr. Polyzos", url: "", email: "polyzos@patras.gr"},
        license: {name: "MIT license", url: "https://opensource.org/licenses/MIT"}
    },
    servers: {
        url: "https://smart-city-patras.com/v1",
        description: "Public domain for the IoT Interoperability Center of Patras",
        variables: {
            name: "port",
            description: "port values",
            server_enum: ["8080","443"],
            server_default: "8080"
        }
    },
    paths: "",
    security: {
        name: "Security scheme of the Service",
        mechanism: {
            security_type: Security_type.oauth2,
            description: "Authentication scheme with OAuth2 to gain access to the Interoperability Center",
            name: "",
            security_in: "",
            scheme: "",
            bearerFormat: "",
            flows: {
                flow_type: "password",
                authorizationUrl: "",
                tokenUrl: "https://smart-city-patras.com/v1/auth/token",
                refreshUrl: "https://smart-city-patras.com/v1/auth/token/refresh",
                scopes: {name: "", description: ""}
            },
            openIdConnectUrl: "" 
        }
    },
    components: "",
    tags: {
        name: "IC-Patras",
        description: "The main API provided by the city's municipality",
        externalDocs: {description: "More info", url: "https://e-patras.gr/interoperability-center"}
    },
    externalDocs: {
        description: "Follow the url for additional docs",
        url: "https://smart-city-patras.com/v1/api/docs"
    },
    x_category: category.SmartCity,
    x_coverage: coverage_1
}



module.exports = {
    api_1,
    api_2,
    api_3
}