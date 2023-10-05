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
import {Agent} from "../../../../commons/interfaces/agent";

@Component({
    selector: 'app-wholesaler-update',
    templateUrl: './wholesaler-update.component.html',
    styleUrls: ['./wholesaler-update.component.css']
})
export class WholesalerUpdateComponent implements OnChanges {

    @Input()
    wholesaler: Wholesaler
    agent:Agent

    form : FormGroup
    displayModal: any;
    formError: string | null = null;

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
            overdraftLimitAmount: new FormControl('', Validators.required),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftBillingOccurrence: new FormControl('', Validators.required),
            overdraftCount: new FormControl('', Validators.required),
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
                    this.formError = null;
                    navigateBack(this.router)
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                    const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                    this.formError = httpError.error.errors.message
                    handleFormError(err as AppError, this.form);
            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
