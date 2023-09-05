import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WholesalerProvisionService} from "../../../../services/wholesaler-provision.service";
import {Router} from "@angular/router";
import {handleFormError, navigateBack} from "../../../../commons/helpers";
import {AppError} from "../../../../commons/errors/app-error";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
    selector: 'app-wholesaler-provision-create',
    templateUrl: './wholesaler-provision-create.component.html',
    styleUrls: ['./wholesaler-provision-create.component.css']
})
export class WholesalerProvisionCreateComponent {
    displayModal: any;
    form : FormGroup

    @Input()
    codeWholesaler: string

    files: File[] = [];

    constructor(private provisionRequestService: WholesalerProvisionService, private router: Router) {
        this.form = new FormGroup({
            amount: new FormControl('', Validators.required),
            files: new FormControl('', Validators.required),
        })

        this.codeWholesaler = ''
        this.displayModal = false
    }

    toggleModal() {
        this.displayModal = !this.displayModal
    }

    create() {
        this.provisionRequestService.create(
            this.codeWholesaler,
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
