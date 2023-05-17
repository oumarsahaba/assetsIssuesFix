import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {BaseWholesaler} from "../../../../commons/models/wholesaler";
import {navigateBack} from "../../../../commons/helpers";

@Component({
  selector: 'app-wholesaler-index',
  templateUrl: './wholesaler-index.component.html',
  styleUrls: ['./wholesaler-index.component.css']
})
export class WholesalerIndexComponent implements OnInit {

    wholesalers: Wholesaler[]

    constructor(private wholesalerService: WholesalerService, private router: Router ) {
        this.wholesalers = []
    }

    ngOnInit(): void {
        this.wholesalerService.getAll()
            .subscribe({
                next: (response) => {
                    this.wholesalers = (response.data as Wholesaler[])
                        .map((wholesaler) => new BaseWholesaler(wholesaler))
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
