import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";

@Component({
    selector: 'app-aggregator-create',
    templateUrl: './aggregator-create.component.html',
    styleUrls: ['./aggregator-create.component.css']
})
export class AggregatorCreateComponent {
    form : FormGroup
    displayModal: boolean

    constructor(private aggregatorService: AggregatorService, private router: Router) {
        this.form = new FormGroup({
            codeAggregator: new FormControl('', Validators.required),
            webhook: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }

    create() {
        this.aggregatorService.create(
            this.form.get('codeAggregator')?.value,
            this.form.get('webhook')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error : (err: AppError) => handleFormError(err, this.form)
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
