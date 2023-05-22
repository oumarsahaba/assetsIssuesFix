import {Component, Input, OnInit} from '@angular/core';
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Router} from "@angular/router";
import {CreditRequest} from "../../../../commons/interfaces/credit-request";
import {CreditRequestService} from "../../../../services/credit-request.service";
import {BaseCreditRequest} from "../../../../commons/models/credit-request";

@Component({
  selector: 'app-credit-request-index',
  templateUrl: './credit-request-index.component.html',
  styleUrls: ['./credit-request-index.component.css']
})
export class CreditRequestIndexComponent implements OnInit {

    @Input()
    codeAgent: any
    creditRequests: CreditRequest[]

    constructor(private creditRequestService: CreditRequestService, private router: Router) {
        this.creditRequests = []
    }

    ngOnInit(): void {
        console.log("on init code Agent" , this.codeAgent)

        if (this.codeAgent != null) {
            this.creditRequestService.getAll(this.codeAgent)
                .subscribe({
                    next: (response) => {
                        this.creditRequests = (response.data as CreditRequest[])
                            .map((creditRequest) => new BaseCreditRequest(creditRequest))
                    },
                    error: (err: AppError) => {
                        if (err instanceof NotFoundError)
                            this.router.navigate(['**'])
                    }
                })
        }
    }

}
