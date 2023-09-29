import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";

@Component({
    selector: 'app-loan-request-validation',
    templateUrl: './loan-request-validation.component.html',
    styleUrls: ['./loan-request-validation.component.css']
})
export class LoanRequestValidationComponent {
    @Input()
    token: string
    @Input()
    disabled: boolean
    form: FormGroup
    displayModal: boolean

    constructor(private loanRequestService: LoanRequestService, private router: Router) {
        this.form = new FormGroup({
            status: new FormControl('', Validators.required),
        })

        this.token = ''
        this.displayModal = false
    }

    validate() {
        this.loanRequestService.validate(this.token, this.form.get('status')?.value)
            .subscribe({
                next: (response) => {
                    navigateBack(this.router)
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])

                    if (err instanceof UnprocessableEntityError)
                        handleFormError(err, this.form)
                }
            })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
