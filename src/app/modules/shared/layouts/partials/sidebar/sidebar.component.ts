import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
    @Input()
    showMobileSideBar : boolean | undefined

    @Output()
    sidebarClosed = new EventEmitter
    constructor(public keycloakService: KeycloakService) {
    }

    toggleSidebar() {

        this.showMobileSideBar = !this.showMobileSideBar

        if (!this.showMobileSideBar)
            this.sidebarClosed.emit()
    }
}
