export const environment = {
    production: false,
    engine: {
        baseUrl: "http://localhost:8080/api/v1"
    },
    keycloak: {
        baseUrl: 'http://localhost:28080/auth',
        realm: "master",
        clientId: "creditdigital",
        redirectUri: "http://localhost:4200"
    }
};
