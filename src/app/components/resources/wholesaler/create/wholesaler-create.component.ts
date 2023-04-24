import {Component, OnInit} from '@angular/core';
import {LenderService} from "../../../../services/lender.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {Lender} from "../../../../commons/interfaces/lender";
import {AggregatorService} from "../../../../services/aggregator.service";
import {BaseLender} from "../../../../commons/models/lender";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseAggregator} from "../../../../commons/models/aggregator";

@Component({
    selector: 'app-wholesaler-create',
    templateUrl: './wholesaler-create.component.html',
    styleUrls: ['./wholesaler-create.component.css']
})
export class WholesalerCreateComponent implements OnInit{
    form : FormGroup
    displayModal: any;
    aggregators: Aggregator[]
    lenders: Lender[]

    constructor(private wholesalerService: WholesalerService,
                private aggregatorService: AggregatorService,
                private lenderService: LenderService,
                private router: Router) {
        this.form = new FormGroup({
            codeWholesaler: new FormControl('', Validators.required),
            codeAggregator: new FormControl('', Validators.required),
            codeLender: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.aggregators = []
        this.lenders = []
        this.displayModal = false
    }

    ngOnInit(): void {
        this.lenderService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.lenders = (response.data as Lender[])
                        .map((lender) => new BaseLender(lender))
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })

        this.aggregatorService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.aggregators = (response.data as Aggregator[])
                        .map((aggregator) => new BaseAggregator(aggregator))
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }

    create() {
        this.wholesalerService.create(
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeAggregator')?.value,
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

    changeAggregator($event: any) {
        this.form.get('codeAggregator')?.setValue($event.target.value, {
            onlySelf: true,
        })

        console.log(this.form.get('codeAggregator')?.value)
    }

    changeLender($event: any) {
        this.form.get('codeLender')?.setValue($event.target.value, {
            onlySelf: true,
        })

        console.log(this.form.get('codeAggregator')?.value)

    }
}
