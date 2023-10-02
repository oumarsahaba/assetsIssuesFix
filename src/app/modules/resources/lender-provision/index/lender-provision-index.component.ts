import {Component, Input, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {LenderProvisionService} from "../../../../services/lender-provision.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {LenderProvision} from "../../../../commons/interfaces/lender-provision";
import {Response} from 'src/app/commons/models/response';
import {Observable, share} from 'rxjs';

@Component({
    selector: 'app-lender-provision-index',
    templateUrl: './lender-provision-index.component.html',
    styleUrls: ['./lender-provision-index.component.css']
})
export class LenderProvisionIndexComponent implements OnInit {

    @Input()
    codeLender: any
    page$: Observable<Response<PaginatedResource<LenderProvision>>>;


    constructor(private provisionRequestService: LenderProvisionService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.page$ = this.provisionRequestService.getAll(this.codeLender, page, 5).pipe(share());

        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })

    }

}
