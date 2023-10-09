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
import Swal from 'sweetalert2';
import { exportExcelFile } from 'src/app/commons/helpers';
import {ToastrService} from "ngx-toastr";
import { ClientError } from 'src/app/commons/errors/client-error';


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

    constructor(private overviewService: OverviewService,
        private router: Router,
        private breadcrumbService: BreadcrumbService,
        private toastr: ToastrService,
        ) {
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

    exportExcel() {
        this.overviewService.getAllRefundRequests(this.codeAgent, this.status,this.startDate, this.endDate)
            .subscribe({
                next: (response) => {
                    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                        // Show a SweetAlert for no data available
                        this.toastr.warning('There is no data available.', 'No Data Available', {
                            timeOut: 3000,
                          });;
                    } else {
                        const headers = ['Token', 'Amount', 'Status','Refund date creation',
                        'Credit request token', 'Credit request amount', 'Credit request fees', 'Credit request outstanding balance',
                        'Credit request recovered amount', 'Credit request status', 'Credit request type', 'Credit request date creation',
                        'Agent code', 'Agent description' ]
                        const dataset = response.data.map(data=>[data.token, data.amount, data.status,data.createdAt,
                            data.creditRequest.token, data.creditRequest.amount, data.creditRequest.fees,
                            data.creditRequest.outstandingBalance, data.creditRequest.recoveredAmount, data.creditRequest.status,
                            data.creditRequest.type, data.creditRequest.createdAt,
                            data.creditRequest.agent.codeAgent, data.creditRequest.agent.description
                            ])
                            try {
                                this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                                    timeOut: 3000,
                                  });
                                exportExcelFile(dataset, headers,'Refund_Request')

                            } catch (err) {
                                this.toastr.error('Cannot export excel file. Contact your manager for more informations', 'File download error', {
                                    timeOut: 3000,
                                  });
                            }
                    }
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found']);
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden']);
                }
            });
    }
}
