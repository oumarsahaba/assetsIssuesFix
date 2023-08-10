import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {KeycloakService} from "keycloak-angular";

@Injectable({
    providedIn: 'root'
})
export class DashboardGuard {

    constructor(private keycloakService: KeycloakService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.router.navigate(['/dashboard'])
/*
        if (this.keycloakService.isUserInRole('admin'))
            return this.router.navigate(['/lender'])

        let resourceCode = this.keycloakService.getKeycloakInstance().tokenParsed["resource_code"]

        if (resourceCode == null)
            return this.router.navigate(['/forbidden'])

        if (this.keycloakService.isUserInRole('aggregator'))
            return this.router.navigate(['/aggregator', resourceCode])

        if (this.keycloakService.isUserInRole('wholesaler'))
            return this.router.navigate(['/wholesaler/', resourceCode])

        return this.router.navigate(['/forbidden'])
*/
    }

}
