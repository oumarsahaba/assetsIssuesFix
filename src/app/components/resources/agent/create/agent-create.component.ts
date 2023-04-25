import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {Lender} from "../../../../commons/interfaces/lender";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AggregatorService} from "../../../../services/aggregator.service";
import {LenderService} from "../../../../services/lender.service";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {BaseLender} from "../../../../commons/models/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseAggregator} from "../../../../commons/models/aggregator";
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";
import {BaseSimpleWholesaler} from "../../../../commons/models/simple-wholesaler";
import {UnprocessableEntityError} from "../../../../commons/errors/unprocessable-entity-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";

@Component({
    selector: 'app-agent-create',
    templateUrl: './agent-create.component.html',
    styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent implements OnInit {
    form : FormGroup
    displayModal: any;
    wholesalers: SimpleWholesaler[]

    constructor(private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private router: Router) {

        this.form = new FormGroup({
            codeAgent: new FormControl('', Validators.required),
            codeWholesaler: new FormControl('', Validators.required),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftPenaltyAmount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            overdraftDeadlinesInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        })

        this.wholesalers = []
        this.displayModal = false
    }

    ngOnInit(): void {
        this.wholesalerService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.wholesalers = (response.data as SimpleWholesaler[])
                        .map((wholesaler) => new BaseSimpleWholesaler(wholesaler))
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }

    create() {
        this.agentService.create(
            this.form.get('codeAgent')?.value,
            this.form.get('codeWholesaler')?.value,
            this.form.get('description')?.value,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftPenaltyAmount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('overdraftDeadlinesInDays')?.value
        ).subscribe({
            next: (response) => {
                navigateBack(this.router)
            },
            error : (err: AppError) => handleFormError(err, this.form)
        })
    }


    toggleModal() {
        this.displayModal = !this.displayModal
    }

    changeWholesaler($event: any) {
        this.form.get('codeWholesaler')?.setValue($event.target.value, {
            onlySelf: true,
        })
    }
}
