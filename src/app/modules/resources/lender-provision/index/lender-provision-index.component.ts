import {Component, Input, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {LenderProvisionService} from "../../../../services/lender-provision.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {LenderProvision} from "../../../../commons/interfaces/lender-provision";

@Component({
    selector: 'app-lender-provision-index',
  templateUrl: './lender-provision-index.component.html',
  styleUrls: ['./lender-provision-index.component.css']
})
export class LenderProvisionIndexComponent implements OnInit {

    @Input()
    codeLender: any
    page: PaginatedResource<LenderProvision>;

    constructor(private provisionRequestService: LenderProvisionService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {

        this.provisionRequestService.getAll(this.codeLender, page, 5)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<LenderProvision>
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
