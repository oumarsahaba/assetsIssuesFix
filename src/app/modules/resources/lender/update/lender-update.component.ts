import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LenderService} from "../../../../services/lender.service";
import {AppError} from "../../../../commons/errors/app-error";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {Lender} from "../../../../commons/interfaces/lender";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-lender-update',
    templateUrl: './lender-update.component.html',
    styleUrls: ['./lender-update.component.css']
})
export class LenderUpdateComponent implements OnInit {
    @Input()
    lender: Lender

    form : FormGroup
    displayModal: boolean

    constructor(private lenderService: LenderService, private router: Router,
                private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            description: new FormControl('', Validators.required),
        })

        this.form.get('description').setValue(this.lender.description)

        this.displayModal = false
    }

    update() {
        this.lenderService.update(
            this.lender.codeLender,
            this.form.get('description')?.value
        ).subscribe({
            next: (response) => {
                if (response.statusCode == 200) {
                    this.toastr.success('Lender updated successfully', 'Success');
                    navigateBack(this.router)
                }
                else{
                    this.toastr.error('Lender updated failed', 'Error');
                }
            },
            error : (err: AppError) => handleFormError(err, this.form)
        })
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }
}
