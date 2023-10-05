import {Component, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {AppError} from "../../../../commons/errors/app-error";
import {OverviewRefundRequest} from "../../../../commons/interfaces/overview-refund-request";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {OverviewService} from "../../../../services/overview.service";
import {RefundRequestStatus} from "../../../../commons/enums/RefundRequestStatus";
import {Observable} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";

@Component({
    selector: 'app-overview-refund-request-index-component',
    templateUrl: './overview-refund-request-index.component.html',
    styleUrls: ['./overview-refund-request-index.component.css']
})
export class OverviewRefundRequestIndexComponent implements OnInit {

    page: PaginatedResource<OverviewRefundRequest>;
    data: OverviewRefundRequest[];
    codeAgent: string = '';
    status: string = '';
    startDate: string;
    endDate: string;
    page$: Observable<Response<PaginatedResource<OverviewRefundRequest>>>;


    items: Breadcrumb[] = [
        {label: "Refund requests"},
    ]

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    protected readonly RefundRequestStatus = RefundRequestStatus;

    constructor(private overviewService: OverviewService, private router: Router, private breadcrumbService: BreadcrumbService) {
    }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items)
        this.breadcrumbService.setHome(this.home)
    }

    goToPage(page: number = 0) {
        this.page$ = this.overviewService.getRefundRequests(page, 10, this.codeAgent, this.status, this.startDate, this.endDate)
        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])
                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }
}
