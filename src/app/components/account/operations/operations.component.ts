import {Component, Input, OnInit} from '@angular/core';
import {Operation} from "../../../commons/interfaces/operation";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {OperationService} from "../../../services/operation.service";
import {PaginatedResource} from "../../../commons/interfaces/paginated-resource";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
    @Input()
    accountSlug: any
    page: PaginatedResource<Operation>;

    constructor(private router: Router, private operationService: OperationService) {
        this.accountSlug = ''
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.operationService.getAccountOperations(this.accountSlug, page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Operation>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })

    }

}
