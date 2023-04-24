import {Component, OnInit} from '@angular/core';
import {Lender} from "../../../../commons/interfaces/lender";
import {LenderService} from "../../../../services/lender.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseLender} from "../../../../commons/models/lender";

@Component({
    selector: 'app-lender-index',
    templateUrl: './lender-index.component.html',
    styleUrls: ['./lender-index.component.css']
})
export class LenderIndexComponent implements OnInit {

    lenders: Lender[]

    constructor(private lenderService: LenderService, private router: Router ) {
        this.lenders = []
    }

    ngOnInit(): void {
        this.lenderService.getAll()
            .subscribe({
                next: (response) => {
                    console.log(response)
                    this.lenders = (response.data as Lender[])
                        .map((lender) => new BaseLender(lender))
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })
    }

    delete(codeLender: string) {
        this.lenderService.delete(codeLender).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    this.router.navigate([this.router.url])
            },
            error: () => {}
        })
    }
}
