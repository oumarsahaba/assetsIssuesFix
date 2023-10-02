import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {AppError} from "../../../../commons/errors/app-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";

@Component({
    selector: 'app-aggregator-show',
    templateUrl: './aggregator-show.component.html',
    styleUrls: ['./aggregator-show.component.css']
})
export class AggregatorShowComponent {
    accountSlug: string | null
    operations: Operation[]
    aggregator$: Observable<Response<Aggregator>>

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private aggregatorService: AggregatorService) {
        this.accountSlug = null
        this.operations = []
    }


    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeAggregator') != null) {
            this.aggregator$ = this.aggregatorService.show(this.route.snapshot.paramMap.get('codeAggregator')).pipe(share())

            this.aggregator$
                .subscribe({
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
