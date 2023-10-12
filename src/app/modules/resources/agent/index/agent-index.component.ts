import {Component, OnInit} from '@angular/core';
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
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import * as XLSX from "xlsx";
import {ToastrService} from "ngx-toastr";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {SimpleWholesaler} from "../../../../commons/interfaces/simple-wholesaler";
import {Breadcrumb} from "../../../../commons/interfaces/breadcrumb";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";

@Component({
    selector: 'app-agent-index',
    templateUrl: './agent-index.component.html',
    styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit {
    wholesalers$: Observable<Response<SimpleWholesaler[]>>
    agents$: Observable<Response<PaginatedResource<Agent>>>
    aggregators$: Observable<Response<Aggregator[]>>

    search = {
        codeAgent: '',
        codeWholesaler: '',
        codeAggregator: '',
    }

    items: Breadcrumb[] = [
        {label: "Agents"}
    ]

    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(public keycloakService: KeycloakService,
                private agentService: AgentService,
                private aggregatorService: AggregatorService,
                private wholesalerService: WholesalerService,
                private breadcrumbService: BreadcrumbService,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items)
        this.breadcrumbService.setHome(this.home)

        this.aggregators$ = this.aggregatorService.getAll().pipe(share())
        this.wholesalers$ = this.wholesalerService.getAll().pipe(share())

        this.goToPage()

        this.search.codeAggregator = null;
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
        this.search.codeAggregator = event.target.value;
        this.goToPage()
    }


    goToPage(page: number = 0) {
        this.agents$ = this.agentService.getAll(this.search.codeAggregator, this.search.codeAgent, this.search.codeWholesaler, page);
    }

    exportExcel(page: number = 0) {
        this.agents$ = this.agentService.getAllAgentWithDeficit(page);
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
}
