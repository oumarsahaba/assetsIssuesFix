import {Component, Input, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {WholesalerProvisionService} from "../../../../services/wholesaler-provision.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {WholesalerProvision} from "../../../../commons/interfaces/wholesaler-provision";
import {Observable} from 'rxjs/internal/Observable';
import {Response} from 'src/app/commons/models/response';
import {share} from 'rxjs';

@Component({
    selector: 'app-wholesaler-provision-index',
    templateUrl: './wholesaler-provision-index.component.html',
    styleUrls: ['./wholesaler-provision-index.component.css']
})
export class WholesalerProvisionIndexComponent implements OnInit {

    @Input()
    codeWholesaler: any
    page: PaginatedResource<WholesalerProvision>;
    page$: Observable<Response<PaginatedResource<WholesalerProvision>>>;


    constructor(private provisionRequestService: WholesalerProvisionService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.page$ = this.provisionRequestService.getAll(this.codeWholesaler, page, 5).pipe(share());
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
