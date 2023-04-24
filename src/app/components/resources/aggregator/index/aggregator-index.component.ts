import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {BaseAggregator} from "../../../../commons/models/aggregator";


@Component({
    selector: 'app-aggregator-index',
    templateUrl: './aggregator-index.component.html',
    styleUrls: ['./aggregator-index.component.css']
})
export class AggregatorIndexComponent implements OnInit {

    aggregators: Aggregator[]

    constructor(private aggregatorService: AggregatorService, private router: Router ) {
        this.aggregators = []
    }

    ngOnInit(): void {
        this.aggregatorService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.aggregators = (response.data as Aggregator[])
                        .map((aggregator) => new BaseAggregator(aggregator))
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
                    this.router.navigate([this.router.url])
            },
            error: () => {}
        })
    }
}
