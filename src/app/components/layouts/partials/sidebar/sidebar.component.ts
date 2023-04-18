import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    @Input()
    showMobileSideBar : boolean | undefined

    @Output()
    sidebarClosed = new EventEmitter

    toggleSidebar() {
        this.showMobileSideBar = !this.showMobileSideBar

        if (!this.showMobileSideBar)
            this.sidebarClosed.emit()
    }
}
