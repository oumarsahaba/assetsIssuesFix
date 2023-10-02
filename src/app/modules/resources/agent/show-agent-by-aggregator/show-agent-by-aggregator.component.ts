import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {Operation} from "../../../../commons/interfaces/operation";
import {Observable} from "rxjs";
import {Response} from "../../../../commons/models/response";
import {ActivatedRoute, Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {WholesalerService} from "../../../../services/wholesaler.service";
import Swal from "sweetalert2";
import {navigateBack} from "../../../../commons/helpers";

@Component({
  selector: 'app-show-agent-by-aggregator',
  templateUrl: './show-agent-by-aggregator.component.html',
  styleUrls: ['./show-agent-by-aggregator.component.css']
})
export class ShowAgentByAggregatorComponent implements OnInit{

    page : PaginatedResource<Agent> = {
        content : [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: false
    }
    page$: Observable<Response<PaginatedResource<Agent>>>
    codeAgent : string = "";
    codeWholesaler : string = "";
    constructor(private agentService: AgentService,
                private route: ActivatedRoute,
                private wholesalerService: WholesalerService,
                private router: Router) {}

    ngOnInit(): void {
        this.goToPage()
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
            error: () => {}
        })
    }

    goToPage(page: number = 0) {
        this.route.params.subscribe((params: { [x: string]: any; }) => {
            const codeAggregator = params['codeAggregator'];

            // Use codeAggregator in your method calls
            this.page$ = this.agentService.getAllAgentByAggregator(codeAggregator, this.codeAgent, page);
            this.agentService.getAllAgentByAggregator(this.codeWholesaler, this.codeAgent, page)
                .subscribe({
                    next: (response) => {
                        // Handle the response here
                    },
                    error: (err: AppError) => {
                        if (err instanceof NotFoundError)
                            this.router.navigate(['/not-found']);

                        if (err instanceof ForbiddenError)
                            this.router.navigate(['/forbidden']);
                    }
                });
        });
    }


    protected readonly console = console;

}
