import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {AgentService} from "../../../../services/agent.service";
import {Agent} from "../../../../commons/interfaces/agent";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import { Observable } from 'rxjs';
import { Response } from 'src/app/commons/models/response';

@Component({
  selector: 'app-agent-show',
  templateUrl: './agent-show.component.html',
  styleUrls: ['./agent-show.component.css']
})
export class AgentShowComponent {

    agent: Agent | null
    accountSlug: string | null
    operations: Operation[]
    agent$: Observable<Response<Agent>>


    constructor(private router: Router, private route: ActivatedRoute, private agentService: AgentService) {
        this.agent = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeAgent') != null) {
            this.agent$ = this.agentService.show(this.route.snapshot.paramMap.get('codeAgent'))
            // @ts-ignore
            this.agentService.show(this.route.snapshot.paramMap.get('codeAgent'))
                .subscribe({
                    next: (response) => {
                        this.agent = response.data as Agent
                        this.accountSlug = this.agent.account.slug
                    },
                    error : (err: AppError) => {
                        if (err instanceof NotFoundError)
                            this.router.navigate(['/not-found'])

                        if (err instanceof ForbiddenError)
                            this.router.navigate(['/forbidden'])
                    }
                })
        }
    }

    protected readonly Commissionable = Commissionable;
}
