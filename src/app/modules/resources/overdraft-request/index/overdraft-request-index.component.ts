import {Component, Input, OnInit} from '@angular/core';
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {CreditRequest} from "../../../../commons/interfaces/credit-request";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {OverdraftService} from "../../../../services/overdraft.service";
import { Observable } from 'rxjs';
import { Response } from 'src/app/commons/models/response';

@Component({
  selector: 'app-overdraft-request-index',
  templateUrl: './overdraft-request-index.component.html',
  styleUrls: ['./overdraft-request-index.component.css']
})
export class OverdraftRequestIndexComponent implements OnInit {

    @Input()
    codeAgent: any
    page: PaginatedResource<CreditRequest>;
    page$: Observable<Response<PaginatedResource<CreditRequest>>>;

    constructor(private overdraftService: OverdraftService, private router: Router) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.page$ = this.overdraftService.getAll(this.codeAgent, page, 5);
        this.overdraftService.getAll(this.codeAgent, page, 5)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<CreditRequest>
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
