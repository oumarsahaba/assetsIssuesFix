import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";

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
            description: new FormControl('', Validators.required),
        })

        this.displayModal = false
    }

    create() {
        this.aggregatorService.create(
            this.form.get('codeAggregator')?.value,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                console.log(response)
                this.router.navigate(['/aggregator'])
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
}
