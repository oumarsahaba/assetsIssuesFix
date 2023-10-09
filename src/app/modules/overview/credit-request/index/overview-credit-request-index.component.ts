import {Component, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {OverviewService} from "../../../../services/overview.service";
import {OverviewCreditRequest} from "../../../../commons/interfaces/overview-credit-request";
import {CreditRequestStatus} from "../../../../commons/enums/CreditRequestStatus";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import {Response} from 'src/app/commons/models/response';
import {Observable} from 'rxjs';
import {BreadcrumbService} from "../../../../commons/services/breadcrumb.service";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {exportExcelFile} from "../../../../commons/helpers";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-overview-credit-request-index-component',
    templateUrl: './overview-credit-request-index.component.html',
    styleUrls: ['./overview-credit-request-index.component.css']
})
export class OverviewCreditRequestIndexComponent implements OnInit {

    page: PaginatedResource<OverviewCreditRequest>;
    data: OverviewCreditRequest[];
   search = {
       codeAgent: '',
       codeWholesaler:  '',
       startDate: '',
       endDate:  '',
       status:  ''
   }
    page$: Observable<Response<PaginatedResource<OverviewCreditRequest>>>;

    protected readonly CreditRequestStatus = CreditRequestStatus;

    items: Breadcrumb[] = [
        {label: "Credit requests"},
    ]

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(private overviewService: OverviewService, private router: Router, private breadcrumbService: BreadcrumbService,
                private toastr:ToastrService) {
    }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
    }

    goToPage(page: number = 0) {
        this.page$ = this.overviewService.getCreditRequests(page, 10, this.search.codeAgent, this.search.codeWholesaler, this.search.status, this.search.startDate, this.search.endDate)
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
        this.overviewService.getAllCreditRequests(this.search.codeWholesaler, this.search.codeAgent, this.search.status)
            .subscribe({
                next: (response) => {
                    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
                        // Show a SweetAlert for no data available
                        Swal.fire({
                            icon: 'info',
                            title: 'No Data Available',
                            text: 'There is no data available for this Credit Request.',
                        });
                        return;
                    } else {
                        const wb: XLSX.WorkBook = XLSX.utils.book_new();
                        const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
                        const headerRow = [
                            'Aggregator Code', 'Aggregator Description',
                            'Wholesaler Code', 'Wholesaler Description',
                            'Agent Code', 'Agent Description',
                            'Amount', 'Fees',
                            'Recovered Amount', 'Outstanding Balance',
                            'Status', 'Type',
                            'Created At'
                        ];
                        XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {origin: -1});
                        const mappedRows = response.data.map(data => {
                            return [
                                data.agent?.wholesaler?.aggregator?.codeAggregator || '',
                                data.agent?.wholesaler?.aggregator?.description || '',
                                data.agent?.wholesaler?.codeWholesaler || '',
                                data.agent?.wholesaler?.description || '',
                                data.agent?.codeAgent || '',
                                data.agent?.description || '',
                                data.amount || '',
                                data.fees || '',
                                data.recoveredAmount || '',
                                data.outstandingBalance || '',
                                data.status || '',
                                data.type || '',
                                data.createdAt || '',
                            ];
                        });
                        try {
                            this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                                timeOut: 3000,
                            });
                            exportExcelFile(mappedRows, headerRow, 'Credit_Request')

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
