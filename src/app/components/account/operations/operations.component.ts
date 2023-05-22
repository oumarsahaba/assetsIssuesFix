import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../commons/interfaces/operation";
import {BaseOperation} from "../../../commons/models/operation";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {OperationService} from "../../../services/operation.service";

@Component({
  selector: 'app-account-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
    @Input()
    accountSlug: any

    operations: Operation[]

    constructor(private operationService: OperationService) {
        this.operations = []
        this.accountSlug = ''
    }

    ngOnInit(): void {
        if (this.accountSlug) {
            this.operationService.getAccountOperations(this.accountSlug)
                .subscribe({
                    next: (response) => {
                        console.log(response)
                        this.operations = (response.data as Operation[])
                            .map((operation) => new BaseOperation(operation))
                    },
                    error : (err: AppError) => {
                        if (err instanceof NotFoundError)
                            console.log(err)
                    }
                })
        }

    }
}
