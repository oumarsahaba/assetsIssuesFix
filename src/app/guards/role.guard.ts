import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private keycloakService: KeycloakService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let roles = route.data?.['roles'] as Array<string>

        if (roles.filter(role => this.keycloakService.isUserInRole(role)).length > 0)
            return true

        return this.router.navigate(['/forbidden'])
    }

}
