import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";


@Component({
  selector: 'app-agent-index',
  templateUrl: './agent-index.component.html',
  styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit{
    page : PaginatedResource<Agent> = {
        content : [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: false
    }

    constructor(private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private router: Router) {}

    ngOnInit(): void {
        this.goToPage()
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
        this.agentService.getAll(page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Agent>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/'])
                }
            })

    }

    protected readonly console = console;
}
