import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from 'sweetalert2'
import {Observable} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';


@Component({
    selector: 'app-agent-index',
    templateUrl: './agent-index.component.html',
    styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit {
    page: PaginatedResource<Agent> = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: false
    }
    page$: Observable<Response<PaginatedResource<Agent>>>
    codeAgent: string = "";
    codeWholesaler: string = "";
    protected readonly console = console;
    items: Breadcrumb[]=[
        {label: "Agents"}    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private router: Router,
                private breadcrumbService: BreadcrumbService) {
                    
                }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items)
        this.breadcrumbService.setHome(this.home)

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

    goToPage(page: number = 0) {
        this.page$ = this.agentService.getAll(this.codeWholesaler, this.codeAgent, page);
        this.page$.subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Agent>
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
