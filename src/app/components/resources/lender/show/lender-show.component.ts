import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Operation} from "../../../../commons/interfaces/operation";
import {LenderService} from "../../../../services/lender.service";
import {Lender} from "../../../../commons/interfaces/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";

@Component({
    selector: 'app-lender-show',
    templateUrl: './lender-show.component.html',
    styleUrls: ['./lender-show.component.css']
})
export class LenderShowComponent implements OnInit {

    lender: Lender | null
    accountSlug: string | null
    operations: Operation[]

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private lenderService: LenderService) {
        this.lender = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeLender') != null) {
            // @ts-ignore
            this.lenderService.show(this.route.snapshot.paramMap.get('codeLender'))
                .subscribe({
                    next: (response) => {
                        this.lender = response.data as Lender
                        this.accountSlug = this.lender.account.slug
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
