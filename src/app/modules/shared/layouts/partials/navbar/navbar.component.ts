import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
    profileDropdown: boolean;
    @Output() openSidebar = new EventEmitter();

    username: string | undefined;

    constructor(private keycloakService: KeycloakService, private router: Router) {
        this.profileDropdown = false;
        this.username = ''

        keycloakService.getToken().then((token) => {
            this.username = keycloakService.getUsername()
        })
    }

    toggleDropdown() {
        this.profileDropdown = !this.profileDropdown;
    }
    sideBarOpen() {
        this.openSidebar.emit();
    }
    logout() {
        this.keycloakService.logout().then(() => this.keycloakService.clearToken());
    }

}
