import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Aggregator} from "../../../../commons/interfaces/aggregator";
import {AggregatorService} from "../../../../services/aggregator.service";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';

@Component({
    selector: 'app-aggregator-index',
    templateUrl: './aggregator-index.component.html',
    styleUrls: ['./aggregator-index.component.css']
})
export class AggregatorIndexComponent implements OnInit {

    page$: Observable<Response<PaginatedResource<Aggregator>>>

    items: Breadcrumb[] = [
        {label: "Aggregators"}]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(private aggregatorService: AggregatorService, private router: Router, private breadcrumbService: BreadcrumbService) {
    }

    ngOnInit(): void {
        this.goToPage()
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
    }

    goToPage(page: number = 0) {
        this.page$ = this.aggregatorService.getPage(page).pipe(share())
        this.page$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }

    confirmDelete(codeAgent: string) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this agent.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.value) {
                // Call your delete function here
                this.delete(codeAgent);
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your item is safe :)', 'error');
            }
        });
    }

    delete(codeAggregator: string) {
        this.aggregatorService.delete(codeAggregator).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: () => {
            }
        })
    }
}
