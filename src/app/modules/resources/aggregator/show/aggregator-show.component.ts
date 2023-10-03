import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {Observable} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {AppError} from "../../../../commons/errors/app-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';

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
    items: Breadcrumb[]=[
        {label: "Aggregators", routerLink: '/aggregator'},
        {label: "Aggregator Details"}
        ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(private router: Router, private route: ActivatedRoute, private aggregatorService: AggregatorService, private breadcrumbService: BreadcrumbService) {
        this.accountSlug = null
        this.operations = []
    }


    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        if (this.route.snapshot.paramMap.get('codeAggregator') != null) {
            this.aggregator$ = this.aggregatorService.show(this.route.snapshot.paramMap.get('codeAggregator'))

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
