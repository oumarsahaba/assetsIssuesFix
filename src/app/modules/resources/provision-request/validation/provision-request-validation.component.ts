import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProvisionRequestService} from "../../../../services/provision-request.service";
import {Router} from "@angular/router";
import {navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {ProvisionRequest} from "../../../../commons/interfaces/provision-request";

@Component({
  selector: 'app-provision-request-validation',
  templateUrl: './provision-request-validation.component.html',
  styleUrls: ['./provision-request-validation.component.css']
})
export class ProvisionRequestValidationComponent {
    @Input()
    provisionRequest: ProvisionRequest
    @Input()
    disabled: boolean
    form : FormGroup
    displayModal: boolean

    constructor(private provisionRequestService: ProvisionRequestService, private router: Router) {
        this.form = new FormGroup({
            status: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }

    validate() {
        this.provisionRequestService.validate(this.provisionRequest.token, this.form.get('status')?.value)
            .subscribe({
                next: (response) => {
                    navigateBack(this.router)
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
