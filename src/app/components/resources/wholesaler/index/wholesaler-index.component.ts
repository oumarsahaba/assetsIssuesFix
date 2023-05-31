import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";

@Component({
  selector: 'app-wholesaler-index',
  templateUrl: './wholesaler-index.component.html',
  styleUrls: ['./wholesaler-index.component.css']
})
export class WholesalerIndexComponent implements OnInit {

    page : PaginatedResource<Wholesaler>

    constructor(private wholesalerService: WholesalerService, private router: Router ) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.wholesalerService.getPage(page, 1)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Wholesaler>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }

    delete(codeWholesaler: string) {
        this.wholesalerService.delete(codeWholesaler).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {}
        })
    }
}
