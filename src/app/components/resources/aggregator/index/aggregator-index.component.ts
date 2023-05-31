import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";


@Component({
    selector: 'app-aggregator-index',
    templateUrl: './aggregator-index.component.html',
    styleUrls: ['./aggregator-index.component.css']
})
export class AggregatorIndexComponent implements OnInit {
    page : PaginatedResource<Aggregator>

    constructor(private aggregatorService: AggregatorService, private router: Router ) {}

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.aggregatorService.getPage(page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Aggregator>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }


    delete(codeAggregator: string) {
        this.aggregatorService.delete(codeAggregator).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {}
        })
    }
}
