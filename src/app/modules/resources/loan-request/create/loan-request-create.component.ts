import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {LenderService} from "../../../../services/lender.service";
import {Lender} from "../../../../commons/interfaces/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseLender} from "../../../../commons/models/lender";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";

@Component({
    selector: 'app-loan-request-create',
    templateUrl: './loan-request-create.component.html',
    styleUrls: ['./loan-request-create.component.css']
})
export class LoanRequestCreateComponent implements OnInit {
    displayModal: any;
    form: FormGroup

    @Input()
    codeWholesaler: string
    lenders: Lender[]

    constructor(private loanRequestService: LoanRequestService,
                private wholesalerService: WholesalerService,
                private lenderService: LenderService,
                private router: Router) {
        this.form = new FormGroup({
            codeLender: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required),
            recoveryPeriodInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            recoveryAmountByPeriod: new FormControl('', Validators.required),
        })

        this.codeWholesaler = ''
        this.lenders = []
        this.displayModal = false
    }

    ngOnInit(): void {
        this.lenderService.getAll()
            .subscribe({
                next: (response) => {
                    this.lenders = (response.data as Lender[])
                        .map((lender) => new BaseLender(lender))
                },
                error: (err: AppError) => {
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

    changeLender($event: any) {
        this.form.get('codeLender')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    create() {
        this.loanRequestService.create(
            this.codeWholesaler,
            this.form.get('codeLender')?.value,
            this.form.get('amount')?.value,
            this.form.get('recoveryPeriodInDays')?.value,
            this.form.get('recoveryAmountByPeriod')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
            },
            error: (err: AppError) => handleFormError(err, this.form)
        })
    }
}
