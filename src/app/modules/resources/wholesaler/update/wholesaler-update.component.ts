import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";

@Component({
    selector: 'app-wholesaler-update',
    templateUrl: './wholesaler-update.component.html',
    styleUrls: ['./wholesaler-update.component.css']
})
export class WholesalerUpdateComponent implements OnChanges {

    @Input()
    wholesaler: Wholesaler

    form : FormGroup
    displayModal: any;

    constructor(private wholesalerService: WholesalerService,
                private router: Router,
                private toastr: ToastrService,
    ) {
    }

    ngOnChanges(changes:SimpleChanges): void {
        this.form = new FormGroup({
            codeWholesaler: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            active: new FormControl('', Validators.required),
        })

        this.displayModal = false

        if (changes.hasOwnProperty('wholesaler')) {
            this.form.get('codeWholesaler').setValue(this.wholesaler.codeWholesaler)
            this.form.get('active').setValue(this.wholesaler.active)
            this.form.get('description').setValue(this.wholesaler.description)
        }
    }

    update() {
        this.wholesalerService.update(
            this.wholesaler.codeWholesaler,
            this.form.get('codeWholesaler')?.value,
            this.form.get('description')?.value,
            this.form.get('active')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Wholesaler updated successfully', 'Success');
                    navigateBack(this.router)
                }
                else{
                    this.toastr.error('Wholesaler updated failed', 'Error');
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                if (err instanceof BadRequestError && (err as BadRequestError).originalError instanceof HttpErrorResponse) {
                    const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                    this.toastr.error(httpError.error.errors.message, 'Error');
                } else {
                    // Handle other types of errors
                    handleFormError(err as AppError, this.form);
                }


            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
