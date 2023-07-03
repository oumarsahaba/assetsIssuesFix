import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {

    constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
        super(router, keycloak);
    }

    async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree> {

        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }

        // Get the roles required from the route.
        let roles = route.data?.['roles'] as Array<string>

        if (roles.length > 0)
            return roles.filter(role => this.keycloak.isUserInRole(role)).length > 0

        return true
    }
}
