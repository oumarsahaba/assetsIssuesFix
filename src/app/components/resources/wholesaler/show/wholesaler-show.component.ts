import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";

@Component({
  selector: 'app-wholesaler-show',
  templateUrl: './wholesaler-show.component.html',
  styleUrls: ['./wholesaler-show.component.css']
})
export class WholesalerShowComponent {
    wholesaler: Wholesaler | null
    accountSlug: string | null
    operations: Operation[]

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private wholesalerService: WholesalerService) {
        this.wholesaler = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('codeWholesaler') != null) {
            // @ts-ignore
            this.wholesalerService.show(this.route.snapshot.paramMap.get('codeWholesaler'))
                .subscribe({
                    next: (response) => {
                        this.wholesaler = response.data as Wholesaler
                        this.accountSlug = this.wholesaler.account.slug
                    },
                    error : (err: AppError) => {
                        if (err instanceof NotFoundError)
                            this.router.navigate(['**'])
                    }
                })
        }
    }
}
