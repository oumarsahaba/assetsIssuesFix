import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

    constructor(private keycloakService: KeycloakService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        console.log(this.keycloakService.getUserRoles(), this.keycloakService.isUserInRole('aggregator'))

        if (this.keycloakService.isUserInRole('admin'))
             return this.router.navigate(['/lender'])

        if (this.keycloakService.isUserInRole('aggregator'))
            return this.router.navigate(['/wholesaler'])

        if (this.keycloakService.isUserInRole('wholesaler'))
            return this.router.navigate(['/agent'])

        return this.router.navigate(['/forbidden'])
    }

}
