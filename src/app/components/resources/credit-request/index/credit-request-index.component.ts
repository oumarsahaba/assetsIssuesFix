import {Component, Input, OnInit} from '@angular/core';
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {CreditRequest} from "../../../../commons/interfaces/credit-request";
import {CreditRequestService} from "../../../../services/credit-request.service";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";

@Component({
  selector: 'app-credit-request-index',
  templateUrl: './credit-request-index.component.html',
  styleUrls: ['./credit-request-index.component.css']
})
export class CreditRequestIndexComponent implements OnInit {

    @Input()
    codeAgent: any
    page: PaginatedResource<CreditRequest>;

    constructor(private creditRequestService: CreditRequestService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {

        this.creditRequestService.getAll(this.codeAgent, page, 5)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<CreditRequest>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])
                }
            })

    }

}
