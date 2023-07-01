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
    size: string = ''

    ngOnInit(): void {
        if (this.size.length == 0)
            this.size= 'xl'
    }

    toggle() {
        this.show = !this.show
    }
}
