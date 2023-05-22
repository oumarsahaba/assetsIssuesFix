import {Component, Input, OnInit} from '@angular/core';
import {LoanRequest} from "../../../../commons/interfaces/loan-request";
import {LoanRequestService} from "../../../../services/loan-request.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseLoanRequest} from "../../../../commons/models/loan-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan-request-index',
  templateUrl: './loan-request-index.component.html',
  styleUrls: ['./loan-request-index.component.css']
})
export class LoanRequestIndexComponent implements OnInit {

    @Input()
    codeWholesaler: any
    loanRequests: LoanRequest[]

    constructor(private loanRequestService: LoanRequestService, private router: Router) {
        this.loanRequests = []
    }

    ngOnInit(): void {
        console.log("on init code wholesaler" , this.codeWholesaler)

        if (this.codeWholesaler != null) {
            this.loanRequestService.getAll(this.codeWholesaler)
                .subscribe({
                    next: (response) => {
                        this.loanRequests = (response.data as LoanRequest[])
                            .map((loanRequest) => new BaseLoanRequest(loanRequest))
                    },
                    error: (err: AppError) => {
                        if (err instanceof NotFoundError)
                            this.router.navigate(['**'])
                    }
                })
        }
    }

}
