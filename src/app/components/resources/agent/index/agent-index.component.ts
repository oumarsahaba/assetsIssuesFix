import {Component, OnInit} from '@angular/core';
import {Agent} from "../../../../commons/interfaces/agent";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/agent.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseAgent} from "../../../../commons/models/Agent";
import {navigateBack} from "../../../../commons/helpers";

@Component({
  selector: 'app-agent-index',
  templateUrl: './agent-index.component.html',
  styleUrls: ['./agent-index.component.css']
})
export class AgentIndexComponent implements OnInit{
    agents: Agent[]

    constructor(private agentService: AgentService,
                private wholesalerService: WholesalerService,
                private router: Router) {
        this.agents = []
    }

    ngOnInit(): void {
        this.agentService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.agents = (response.data as Agent[])
                        .map((agent) => new BaseAgent(agent))

                    console.log('agents', this.agents)
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
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
}
