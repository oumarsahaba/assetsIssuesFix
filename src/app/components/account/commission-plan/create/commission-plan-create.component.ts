import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Router} from "@angular/router";
import {CommissionPlanService} from "../../../../services/commission-plan.service";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {OperationType} from "../../../../commons/enums/OperationType";

@Component({
  selector: 'app-commission-plan-create',
  templateUrl: './commission-plan-create.component.html',
  styleUrls: ['./commission-plan-create.component.css']
})
export class CommissionPlanCreateComponent {
    form : FormGroup
    displayModal: boolean

    @Input()
    code: string

    @Input()
    type: string

    protected readonly OperationType = OperationType;

    constructor(private commissionPlanService: CommissionPlanService, private router: Router) {
        this.form = new FormGroup({
            startAmount: new FormControl('', Validators.required),
            endAmount: new FormControl('', Validators.required),
            feesFix: new FormControl('', Validators.required),
            feesPercentage: new FormControl('', Validators.required),
            commissionAggregator: new FormControl('', Validators.required),
            commissionWholesaler: new FormControl('', Validators.required),
            commissionLender: new FormControl('', Validators.required),
            operationType: new FormControl('', Validators.required)
        })

        this.displayModal = false
    }


    create() {
        this.commissionPlanService.create({
            startAmount: this.form.get('startAmount').value,
            endAmount: this.form.get('endAmount').value,
            feesFix: this.form.get('feesFix').value,
            feesPercentage: this.form.get('feesPercentage').value,
            commissionAggregator: this.form.get('commissionAggregator').value,
            commissionWholesaler: this.form.get('commissionWholesaler').value,
            commissionLender: this.form.get('commissionLender').value,
            operationType: this.form.get('operationType').value,
            resourceType: this.type,
            resourceCode: this.code
        }).subscribe({
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

    changeOperationType($event: Event) {

    }

    protected readonly Object = Object;
}
