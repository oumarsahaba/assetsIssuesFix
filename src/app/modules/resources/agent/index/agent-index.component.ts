import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from 'sweetalert2';
import {KeycloakService} from "keycloak-angular";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';

@Component({
    selector: 'app-agent-index',
    templateUrl: './agent-index.component.html',
    styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit {

    page$: Observable<Response<PaginatedResource<Agent>>>
    codeAgent: string = "";
    codeWholesaler: string = "";
    codeAggregator: string = "";

    aggregators: any[];

    constructor(public keycloakService: KeycloakService,
                private agentService: AgentService,
                private breadcrumbService: BreadcrumbService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.codeAggregator = null;
        this.page$ = this.agentService.getAll(this.codeAggregator, this.codeAgent, this.codeWholesaler);
        this.getAllAggregators()
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
