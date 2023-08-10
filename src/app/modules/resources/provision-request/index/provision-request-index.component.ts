import {Component, Input, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ProvisionRequestService} from "../../../../services/provision-request.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {ProvisionRequest} from "../../../../commons/interfaces/provision-request";

@Component({
    selector: 'app-provision-request-index',
  templateUrl: './provision-request-index.component.html',
  styleUrls: ['./provision-request-index.component.css']
})
export class ProvisionRequestIndexComponent implements OnInit {

    @Input()
    codeLender: any
    page: PaginatedResource<ProvisionRequest>;

    constructor(private provisionRequestService: ProvisionRequestService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {

        this.provisionRequestService.getAll(this.codeLender, page, 5)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<ProvisionRequest>
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
