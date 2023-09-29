import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseAggregator} from "../../../../commons/models/aggregator";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-wholesaler-create',
    templateUrl: './wholesaler-create.component.html',
    styleUrls: ['./wholesaler-create.component.css']
})
export class WholesalerCreateComponent implements OnInit {
    form: FormGroup
    displayModal: any;
    aggregators: Aggregator[]

    constructor(private wholesalerService: WholesalerService,
                private aggregatorService: AggregatorService,
                private toastr: ToastrService,
                private router: Router) {
        this.form = new FormGroup({
            codeWholesaler: new FormControl('', Validators.required),
            codeAggregator: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.aggregators = []
        this.displayModal = false
    }

    ngOnInit(): void {
        this.aggregatorService.getAll()
            .subscribe({
                next: (response) => {
                    this.aggregators = (response.data as Aggregator[])
                        .map((aggregator) => new BaseAggregator(aggregator))
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
    }

    create() {
        this.wholesalerService.create(
            this.form.get('codeWholesaler')?.value,
            this.form.get('codeAggregator')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('WholeSaler created successfully', 'Success');
                    navigateBack(this.router)
                } else {
                    this.toastr.error('WholeSaler created failed', 'Error');
                }
            },
            error: (err: AppError) => handleFormError(err, this.form)
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    changeAggregator($event: any) {
        this.form.get('codeAggregator')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }

    changeLender($event: any) {
        this.form.get('codeLender')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }
}
