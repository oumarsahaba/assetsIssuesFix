import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";

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
                this.router.navigate(['home'])
            },
            error : (err: AppError) => {
                if (err instanceof UnprocessableEntityError ){
                    let validationErrors = err.errors

                    Object.keys(validationErrors).forEach(prop => {
                        const formControl = this.form.get(prop);
                        if (formControl) {
                            let error = validationErrors[prop as keyof typeof validationErrors]

                            if (Array.isArray(error)){
                                formControl.setErrors({
                                    serverError: error[0]
                                });
                            }
                        }
                    });
                }
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
