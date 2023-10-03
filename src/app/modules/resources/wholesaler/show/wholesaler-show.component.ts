import {Component} from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute, Router} from "@angular/router";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Commissionable} from "../../../../commons/enums/Commissionable";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';

@Component({
    selector: 'app-wholesaler-show',
    templateUrl: './wholesaler-show.component.html',
    styleUrls: ['./wholesaler-show.component.css']
})
export class WholesalerShowComponent {
    wholesaler: Wholesaler | null
    accountSlug: string | null
    operations: Operation[]
    wholesaler$: Observable<Response<Wholesaler>>
    items: Breadcrumb[]=[
        {label: "Wholesalers", routerLink: '/wholesaler'},
        {label: "Wholesaler Details"}
    ]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    protected readonly Commissionable = Commissionable;

    constructor(private router: Router, private route: ActivatedRoute, private wholesalerService: WholesalerService, private breadcrumbService: BreadcrumbService) {
        this.wholesaler = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        if (this.route.snapshot.paramMap.get('codeWholesaler') != null) {
            this.wholesaler$ = this.wholesalerService.show(this.route.snapshot.paramMap.get('codeWholesaler')).pipe(share())
            this.wholesaler$.subscribe({
                error: (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['/not-found'])

                    if (err instanceof ForbiddenError)
                        this.router.navigate(['/forbidden'])

                }
            })
        }
    }
}
