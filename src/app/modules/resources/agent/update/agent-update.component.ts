import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Agent} from "../../../../commons/interfaces/agent";

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

    constructor(private agentService: AgentService, private router: Router) {}

    ngOnChanges(changes: SimpleChanges){
        this.form = new FormGroup({
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
}
