import {Component, Input, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {exportExcelFile, navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from 'sweetalert2';
import {KeycloakService} from "keycloak-angular";
import {Observable} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import * as XLSX from "xlsx";
import {ToastrService} from "ngx-toastr";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {BaseSimpleWholesaler} from "../../../../commons/models/simple-wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";

@Component({
    selector: 'app-agent-index',
    templateUrl: './agent-index.component.html',
    styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit {
    wholesalers:SimpleWholesaler[]
    wholesaler:BaseSimpleWholesaler[];
    page$: Observable<Response<PaginatedResource<Agent>>>
    codeAgent: string = "";
    codeWholesaler: string = "";
    codeAggregator: string = "";

    aggregators: any[];

    constructor(public keycloakService: KeycloakService,
                private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private breadcrumbService: BreadcrumbService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        console.log("Ridial ioe")
        this.codeAggregator = null;
        this.page$ = this.agentService.getAll(this.codeAggregator, this.codeAgent, this.codeWholesaler);
        this.getAllAggregators()
        this.wholesalerService.getAll()

            .subscribe({
                next: (response) => {
                    console.log("Ridial ioe")
                    console.log(response)
                    this.wholesalers = (response.data as SimpleWholesaler[])
                        .map((wholesaler) => new BaseSimpleWholesaler(wholesaler))
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
    }

    confirmDelete(codeAgent: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this agent.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.value) {
                // Call your delete function here
                this.delete(codeAgent);
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    }

    delete(codeAgent: string) {
        this.agentService.delete(codeAgent).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }

    onAggregatorChange(event: any) {
        this.codeAggregator = event.target.value;
        this.page$ = this.agentService.getAll(this.codeAggregator, this.codeWholesaler, this.codeAgent, 0);
    }


    goToPage(page: number = 0) {
        this.page$ = this.agentService.getAll(this.codeAggregator, this.codeAgent, this.codeWholesaler, page);
    }

    exportExcel(page: number = 0) {
        this.page$ = this.agentService.getAllAgentWithDeficit(page);
        this.agentService.getAllAgentWithDeficit(page).subscribe({
            next: (response) => {
                if (!response.data ||
                    !response.data.content ||
                    !Array.isArray(response.data.content) ||
                    response.data.content.length === 0
                ) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Data Available',
                        text: 'There is no data available for this Credit Request.',
                    });
                    return;
                }
                const wb: XLSX.WorkBook = XLSX.utils.book_new();
                const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);
                const headerRow = [
                    'Wholesaler Code',
                    'Wholesaler Description',
                    'Agent Code',
                    'Agent Description',
                    'Balance',
                    'Created At',
                ];

                XLSX.utils.sheet_add_aoa(worksheet, [headerRow], {origin: -1});
                const mappedRows = response.data.content.map((data: {
                    wholesaler: { codeWholesaler: any; description: any; };
                    codeAgent: any;
                    description: any;
                    account: { balance: any; };
                    createdAt: any;
                }) => {
                    return [
                        data.wholesaler?.codeWholesaler || '',
                        data.wholesaler?.description || '',
                        data.codeAgent || '',
                        data.description || '',
                        data.account?.balance || '',
                        data.createdAt || '',
                    ];
                });
                try {
                    this.toastr.info('File will be exported soon. Check downloads', 'File exportation', {
                        timeOut: 3000,
                    });
                    exportExcelFile(mappedRows, headerRow, 'Agents_With_Deficit')

                } catch (err) {
                    this.toastr.error('Cannot export excel file. Contact your manager for more informations', 'File download error', {
                        timeOut: 3000,
                    });
                }
            },
            error: (err: AppError) => {
                if (err instanceof NotFoundError) this.router.navigate(['/not-found']);
                if (err instanceof ForbiddenError) this.router.navigate(['/forbidden']);
            },
        });
    }

    getAllAggregators() {
        this.agentService.getAggregators()
            .subscribe({
                next: (response) => {
                    this.aggregators = response.data;
                },
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
    }
}
