import {Component, Input} from '@angular/core';
import {Agent} from "../../../commons/interfaces/agent";

@Component({
    selector: 'app-active-badge',
    templateUrl: './active-badge.component.html',
    styleUrls: ['./active-badge.component.css']
})
export class ActiveBadgeComponent {

    @Input() active: boolean;
}
