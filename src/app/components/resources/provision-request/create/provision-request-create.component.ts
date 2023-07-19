import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProvisionRequestService} from "../../../../services/provision-request.service";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
    selector: 'app-provision-request-create',
    templateUrl: './provision-request-create.component.html',
    styleUrls: ['./provision-request-create.component.css']
})
export class ProvisionRequestCreateComponent {
    displayModal: any;
    form : FormGroup

    @Input()
    codeLender: string

    files: File[] = [];

    constructor(private provisionRequestService: ProvisionRequestService, private router: Router) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            files: new FormControl('', Validators.required),
        })

        this.codeLender = ''
        this.displayModal = false
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    create() {
        this.provisionRequestService.create(
            this.codeLender,
            this.form.get('amount')?.value,
            this.files,
        ).subscribe({
            next: (response) => {
                this.files = [];
                navigateBack(this.router)
            },
            error : (err: AppError) => handleFormError(err, this.form)
        })
    }

    onSelect($event: NgxDropzoneChangeEvent) {
        console.log($event);
        this.files.push(...$event.addedFiles);
    }

    onRemove(file: File) {
        console.log(file);
        this.files.splice(this.files.indexOf(file), 1);
    }
}
