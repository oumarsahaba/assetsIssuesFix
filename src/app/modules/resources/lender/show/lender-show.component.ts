import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Operation} from "../../../../commons/interfaces/operation";
import {LenderService} from "../../../../services/lender.service";
import {Lender} from "../../../../commons/interfaces/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BadRequestError} from "../../../../commons/errors/bad-request-error";
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';

@Component({
    selector: 'app-lender-show',
    templateUrl: './lender-show.component.html',
    styleUrls: ['./lender-show.component.css']
})
export class LenderShowComponent implements OnInit {
    lender$: Observable<Response<Lender>>
    accountSlug: string | null
    operations: Operation[]
    items: Breadcrumb[]=[
        {label: "Lenders", routerLink: '/lender'},
        {label: "Lender Details"} 
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private lenderService: LenderService, private breadcrumbService: BreadcrumbService) {
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        if (this.route.snapshot.paramMap.get('codeLender') != null) {
            this.lender$ = this.lenderService.show(this.route.snapshot.paramMap.get('codeLender')).pipe(share())
            this.lender$.subscribe({
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
