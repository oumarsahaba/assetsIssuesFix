import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {

    return () =>

        keycloak.init({
            config: {
                url: 'https://dev-sso.gutouch.net/auth',
                realm: 'master',
                clientId: 'creditdigital',
            },
            initOptions: {
                checkLoginIframe: false,
                redirectUri: 'https://credit-digital-front-dot-credit-digital-386211.oa.r.appspot.com',
            },
            loadUserProfileAtStartUp : true
        });

}
