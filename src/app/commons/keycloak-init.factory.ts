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
                redirectUri: 'http://localhost:4200',
            },
            loadUserProfileAtStartUp : true
        });

}
