import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseAgent} from "../../../../commons/models/agent";
import {navigateBack} from "../../../../commons/helpers";

@Component({
  selector: 'app-agent-index',
  templateUrl: './agent-index.component.html',
  styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit{
    agents: Agent[]
    page = {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        last: false
    }

    constructor(private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private router: Router) {
        this.agents = []
    }

    ngOnInit(): void {
        this.goToPage(0)
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

    goToPage(page: number) {
        this.agentService.getAll(page, 1)
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.agents = (response.data.agents as Agent[])
                        .map((agent) => new BaseAgent(agent))
                    this.page = {
                        totalItems: response.data.totalItems,
                        totalPages: response.data.totalPages,
                        currentPage: response.data.page,
                        last: response.data.last
                    }
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })

    }
}
