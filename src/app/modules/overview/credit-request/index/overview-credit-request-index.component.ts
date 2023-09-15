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

@Component({
    selector: 'app-overview-credit-request-index-component',
    templateUrl: './overview-credit-request-index.component.html',
    styleUrls: ['./overview-credit-request-index.component.css']
})
export class OverviewCreditRequestIndexComponent implements OnInit {

    page: PaginatedResource<OverviewCreditRequest>;
    data: OverviewCreditRequest[];
    codeAgent: string = '';
    codeWholesaler: string = '';
    status:string = '';

    constructor(private overviewService: OverviewService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {

        this.overviewService.getCreditRequests(page, 10, this.codeAgent, this.codeWholesaler, this.status)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<OverviewCreditRequest>;
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })

    }
    exportExcel() {
        this.overviewService.getAllCreditRequests(this.codeWholesaler, this.codeAgent, this.status)
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
                    }
                 else{
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

                    XLSX.utils.sheet_add_aoa(worksheet, [headerRow], { origin: -1 });
                    // Iterate over the data and add the fields to the worksheet
                    for (let i = 0; i < response.data.length; i++) {
                        const data = response.data[i];
                        const row = [
                            data.agent.wholesaler.aggregator.codeAggregator, data.agent.wholesaler.aggregator.description,
                            data.agent.wholesaler.codeWholesaler, data.agent.wholesaler.description,
                            data.agent.codeAgent, data.agent.description,
                            data.amount, data.fees,
                            data.recoveredAmount, data.outstandingBalance,
                            data.status, data.type,
                            data.createdAt
                        ];

                        XLSX.utils.sheet_add_aoa(worksheet, [row], { origin: -1 });
                    }
                    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');
                    // Save the Excel spreadsheet
                    XLSX.writeFile(wb, 'credit_request.xlsx');
                }},
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found']);
                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden']);
                }
            });
    }




    protected readonly CreditRequestStatus = CreditRequestStatus;
}
