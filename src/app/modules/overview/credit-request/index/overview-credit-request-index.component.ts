import {Component, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {OverviewService} from "../../../../services/overview.service";
import {OverviewCreditRequest} from "../../../../commons/interfaces/overview-credit-request";

@Component({
  selector: 'app-overview-credit-request-index-component',
  templateUrl: './overview-credit-request-index.component.html',
  styleUrls: ['./overview-credit-request-index.component.css']
})
export class OverviewCreditRequestIndexComponent implements OnInit{

    page: PaginatedResource<OverviewCreditRequest>;

    codeAgent: string = '';
    codeWholesaler: string = '';
    selectedStatus:string = '';

    constructor(private overviewService: OverviewService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {

        this.overviewService.getCreditRequests(page, 10)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<OverviewCreditRequest>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })

    }
    validateData() {
        this.overviewService.getCreditRequestsFilter(this.codeAgent, this.codeWholesaler,this.selectedStatus)
            .subscribe({
                next: (response) => {
                    if (response.data && response.data.size > 0) {
                        this.page = response.data as PaginatedResource<OverviewCreditRequest>;
                    } else {
                        this.page = null;
                    }
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError) {
                        this.router.navigate(['/not-found']);
                    }
                    if (err instanceof ForbiddenError) {
                        this.router.navigate(['/forbidden']);
                    }
                },
            });
    }


}
