import {Component, Input, OnInit} from '@angular/core';
import {LoanRequest} from "../../../../commons/interfaces/loan-request";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";

@Component({
  selector: 'app-loan-request-index',
  templateUrl: './loan-request-index.component.html',
  styleUrls: ['./loan-request-index.component.css']
})
export class LoanRequestIndexComponent implements OnInit {

    @Input()
    codeWholesaler: any
    page: PaginatedResource<LoanRequest>;

    constructor(private loanRequestService: LoanRequestService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.loanRequestService.getAll(this.codeWholesaler, page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<LoanRequest>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])
                }
            })

    }
}
