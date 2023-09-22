import {Component, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {AppError} from "../../../../commons/errors/app-error";
import {OverviewRefundRequest} from "../../../../commons/interfaces/overview-refund-request";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {OverviewService} from "../../../../services/overview.service";
import {RefundRequestStatus} from "../../../../commons/enums/RefundRequestStatus";

@Component({
    selector: 'app-overview-refund-request-index-component',
    templateUrl: './overview-refund-request-index.component.html',
    styleUrls: ['./overview-refund-request-index.component.css']
})
export class OverviewRefundRequestIndexComponent implements OnInit {

    page: PaginatedResource<OverviewRefundRequest>;
    data: OverviewRefundRequest[];
    codeAgent: string = '';
    status:string = '';

    protected readonly RefundRequestStatus = RefundRequestStatus;

    constructor(private overviewService: OverviewService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }
    goToPage(page: number = 0) {

        this.overviewService.getRefundRequests(page, 10, this.codeAgent, this.status)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<OverviewRefundRequest>;
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })

    }
}
