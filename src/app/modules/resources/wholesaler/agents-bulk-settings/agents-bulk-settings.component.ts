import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {HttpErrorResponse} from "@angular/common/http";
import {AppError} from "../../../../commons/errors/app-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";

@Component({
  selector: 'app-agents-bulk-settings',
  templateUrl: './agents-bulk-settings.component.html',
  styleUrls: ['./agents-bulk-settings.component.css']
})
export class AgentsBulkSettingsComponent implements OnChanges {

    @Input()
    wholesaler:Wholesaler
    agent: Agent
    form: FormGroup
    displayModal: any;
    formError: string | null = null;

    constructor(
                private wholesalerService: WholesalerService,private router: Router,
                private toastr: ToastrService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.form = new FormGroup({
            overdraftMaxDailyCount: new FormControl('', Validators.required),
            overdraftLimitAmount: new FormControl('', Validators.required),
            penaltyDelayInDays: new FormControl('', Validators.required),
            overdraftBillingOccurrence: new FormControl('', Validators.required),

        })

        if (changes.hasOwnProperty('wholesaler')) {
            this.form.get('overdraftMaxDailyCount').setValue(this.agent?.overdraftMaxDailyCount)
            this.form.get('overdraftLimitAmount').setValue(this.agent?.overdraftLimitAmount)
            this.form.get('penaltyDelayInDays').setValue(this.agent?.penaltyDelayInDays)
            this.form.get('overdraftBillingOccurrence').setValue(this.agent?.overdraftBillingOccurrence)
        }
        this.displayModal = false
    }

    update() {
        this.wholesalerService.updateAgent(
            this.wholesaler?.codeWholesaler,
            this.form.get('overdraftMaxDailyCount')?.value,
            this.form.get('overdraftLimitAmount')?.value,
            this.form.get('penaltyDelayInDays')?.value,
            this.form.get('overdraftBillingOccurrence')?.value,
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.formError =null
                    this.toastr.success('Agents updated successfully', 'Success');
                    navigateBack(this.router)
                }
            },
            error: (err: HttpErrorResponse | AppError) => {
                const httpError = (err as BadRequestError).originalError as HttpErrorResponse;
                this.formError = httpError.error.errors.message
                console.log(this.formError);
                handleFormError(err as AppError, this.form);
            }
        })
    }
    toggleModal() {
        this.displayModal = !this.displayModal
    }

}
