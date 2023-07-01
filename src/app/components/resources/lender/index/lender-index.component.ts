import {Component, OnInit} from '@angular/core';
import {Lender} from "../../../../commons/interfaces/lender";
import {LenderService} from "../../../../services/lender.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";

@Component({
    selector: 'app-lender-index',
    templateUrl: './lender-index.component.html',
    styleUrls: ['./lender-index.component.css']
})
export class LenderIndexComponent implements OnInit {

    page: PaginatedResource<Lender>;

    constructor(private lenderService: LenderService, private router: Router ) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.lenderService.getPage(page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Lender>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])
                }
            })

    }

    delete(codeLender: string) {
        this.lenderService.delete(codeLender).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: (err) => console.log('code lender delete error', err)
        })
    }
}
