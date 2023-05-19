import {Component, OnInit} from '@angular/core';
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

    loanRequests: LoanRequest[]

    constructor(private loanRequestService: LoanRequestService, private router: Router) {
        this.loanRequests = []
    }

    ngOnInit(): void {
        this.loanRequestService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.loanRequests = (response.data as LoanRequest[])
                        .map((loanRequest) => new BaseLoanRequest(loanRequest))
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }

}
