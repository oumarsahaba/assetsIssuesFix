import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {AgentService} from "../../../../services/agent.service";
import {Agent} from "../../../../commons/interfaces/agent";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BadRequestError} from "../../../../commons/errors/bad-request-error";

@Component({
    selector: 'app-agent-show',
    templateUrl: './agent-show.component.html',
    styleUrls: ['./agent-show.component.css']
})
export class AgentShowComponent {

    accountSlug: string | null
    operations: Operation[]
    agent$: Observable<Response<Agent>>


    constructor(private router: Router, private route: ActivatedRoute, private agentService: AgentService) {
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeAgent') != null) {
            this.agent$ = this.agentService.show(this.route.snapshot.paramMap.get('codeAgent')).pipe(share())

            this.agent$.subscribe({
                error: (err: AppError) => {
                    if (err instanceof BadRequestError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })
        }
    }

}
