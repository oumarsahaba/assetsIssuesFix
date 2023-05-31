import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'app-shared-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @Input()
    show: boolean = false

    @Input()
    size: string = 'lg'

    ngOnInit(): void {}

    toggle() {
        this.show = !this.show
    }

}
