import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html',
    styleUrls: ['./actions-dropdown.component.css']
})
export class ActionsDropdownComponent {
    show: boolean = false;

    toggleDisplay() {
        this.show = !this.show
    }
}
