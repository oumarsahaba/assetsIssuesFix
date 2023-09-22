import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KeycloakService, KeycloakEventType } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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

    ngOnInit(): void {
        this.keycloakService.keycloakEvents$.subscribe({
            next: (event) => {
                console.log("Component Initialized")
                if (event.type === KeycloakEventType.OnTokenExpired) {
                    // Token has expired, redirect to the login page
                    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
                }
            }
        });
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
