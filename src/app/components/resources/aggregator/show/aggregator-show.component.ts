import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";

@Component({
  selector: 'app-aggregator-show',
  templateUrl: './aggregator-show.component.html',
  styleUrls: ['./aggregator-show.component.css']
})
export class AggregatorShowComponent {
    aggregator: Aggregator | null
    accountSlug: string | null
    operations: Operation[]

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private aggregatorService: AggregatorService) {
        this.aggregator = null
        this.accountSlug = null
        this.operations = []
    }


    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeAggregator') != null) {
            // @ts-ignore
            this.aggregatorService.show(this.route.snapshot.paramMap.get('codeAggregator'))
                .subscribe({
                    next: (response) => {
                        this.aggregator = response.data as Aggregator
                        this.accountSlug = this.aggregator.account.slug
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
}
