export const environment = {
    production: true,
    engine: {
        baseUrl: "%ENGINE_BASE_URL%"
    },
    keycloak: {
        baseUrl: "%KEYCLOAK_SERVER_URL%",
        realm: "%KEYCLOAK_REALM%",
        clientId: "%KEYCLOAK_RESOURCE%",
        redirectUri: "%KEYCLOAK_REDIRECT_URL%"
    }
};
