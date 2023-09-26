import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-aggregator-update',
    templateUrl: './aggregator-update.component.html',
    styleUrls: ['./aggregator-update.component.css']
})
export class AggregatorUpdateComponent implements OnInit {

    @Input()
    aggregator: Aggregator

    form : FormGroup
    displayModal: boolean

    constructor(private aggregatorService: AggregatorService, private router: Router,
                private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            //codeAggregator: new FormControl('', Validators.required),
            webhook: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.form.get('webhook').setValue(this.aggregator.webhook)
        this.form.get('description').setValue(this.aggregator.description)

        this.displayModal = false
    }

    update() {
        this.aggregatorService.update(
            this.aggregator.codeAggregator,
            this.form.get('webhook')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Agregator updated successfully', 'Success');
                    navigateBack(this.router)
                }
                else {
                    this.toastr.error('Agregator updated failed', 'Error');
                }
            },
            error: (err: AppError) => {
                handleFormError(err, this.form);

            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
