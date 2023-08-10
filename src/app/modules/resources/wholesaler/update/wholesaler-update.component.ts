import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";

@Component({
    selector: 'app-wholesaler-update',
    templateUrl: './wholesaler-update.component.html',
    styleUrls: ['./wholesaler-update.component.css']
})
export class WholesalerUpdateComponent implements OnInit {

    @Input()
    wholesaler: Wholesaler

    form : FormGroup
    displayModal: any;

    constructor(private wholesalerService: WholesalerService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            description: new FormControl('', Validators.required),
            active: new FormControl('', Validators.required),
        })

        this.displayModal = false

        this.form.get('active').setValue(this.wholesaler.active)
        this.form.get('description').setValue(this.wholesaler.description)

        this.displayModal = false

    }

    update() {
        this.wholesalerService.update(
            this.wholesaler.codeWholesaler,
            this.form.get('description')?.value,
            this.form.get('active')?.value
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
            },
            error : (err: AppError) => handleFormError(err, this.form)
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
