import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Agent} from "../../../../commons/interfaces/agent";
import { ToastrService } from 'ngx-toastr';
import {HttpErrorResponse} from "@angular/common/http";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
@Component({
    selector: 'app-agent-update',
    templateUrl: './agent-update.component.html',
    styleUrls: ['./agent-update.component.css']
})
export class AgentUpdateComponent implements OnChanges {
    @Input()
    agent: Agent

    form : FormGroup
    displayModal: any;

    constructor(private agentService: AgentService, private router: Router,
                private toastr: ToastrService,
                ) {}

    ngOnChanges(changes: SimpleChanges){
        this.form = new FormGroup({
            codeAgent: new FormControl('', Validators.required),
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            penaltyDelayInDays: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            active: new FormControl('', Validators.required)
        })

        if(changes.hasOwnProperty('agent')) {
            this.form.get('active').setValue(this.agent?.active)
            this.form.get('description').setValue(this.agent?.description)
            this.form.get('overdraftMaxDailyCount').setValue(this.agent?.overdraftMaxDailyCount)
            this.form.get('overdraftLimitAmount').setValue(this.agent?.overdraftLimitAmount)
            this.form.get('penaltyDelayInDays').setValue(this.agent?.penaltyDelayInDays)
            this.form.get('codeAgent').setValue(this.agent?.codeAgent)
        }

        this.displayModal = false

    }

    update() {
        this.agentService.update(
            this.agent.codeAgent,
            this.form.get('description')?.value,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('penaltyDelayInDays')?.value,
            this.form.get('active')?.value,
            this.form.get('codeAgent')?.value,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Agent updated successfully', 'Success');
                    navigateBack(this.router)
                }
                else{
                    this.toastr.error('Agent updated failed', 'Error');
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                if (err instanceof BadRequestError && (err as BadRequestError).originalError instanceof HttpErrorResponse) {
                    const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                    this.toastr.error(httpError.error.errors.message, 'Error');
                } else {
                    // Handle other types of errors
                    handleFormError(err as AppError, this.form);
                }


            }
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
