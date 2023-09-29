import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Lender} from "../../../../commons/interfaces/lender";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";

@Component({
    selector: 'app-lender-update',
    templateUrl: './lender-update.component.html',
    styleUrls: ['./lender-update.component.css']
})
export class LenderUpdateComponent implements OnInit {
    @Input()
    lender: Lender
    form: FormGroup
    displayModal: boolean
    formError: string | null = null;
    constructor(private lenderService: LenderService, private router: Router,
                private toastr: ToastrService,
    ) {
    }
    ngOnInit(): void {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })
        this.form.get('codeLender').setValue(this.lender.codeLender)
        this.form.get('description').setValue(this.lender.description)
        this.displayModal = false
    }
    update() {
        this.lenderService.update(
            this.lender.codeLender,
            this.form.get('codeLender')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formError = null;
                    this.toastr.success('Lender updated successfully', 'Success');
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
