import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";

@Component({
    selector: 'app-lender-create',
    templateUrl: './lender-create.component.html',
    styleUrls: ['./lender-create.component.css']
})
export class LenderCreateComponent  {
    form : FormGroup
    displayModal: boolean

    constructor(private lenderService: LenderService, private router: Router) {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }

    create() {
        this.lenderService.create(
            this.form.get('codeLender')?.value,
            this.form.get('description')?.value
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
