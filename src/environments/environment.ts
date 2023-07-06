export const environment = {
    production: true,
    engine: {
        baseUrl: "https://engine-back-end-dev-dot-credit-digital-386211.oa.r.appspot.com/api/v1"
    },
    keycloak: {
        baseUrl: "https://dev-sso.gutouch.net/auth",
        realm: "credit-digital",
        clientId: "engine",
        redirectUri: "https://engine-front-end-dev-dot-credit-digital-386211.oa.r.appspot.com"
    }
};
