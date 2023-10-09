import {Component, OnInit} from '@angular/core';
import {Lender} from "../../../../commons/interfaces/lender";
import {LenderService} from "../../../../services/lender.service";
import {Router} from "@angular/router";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import {Observable, share} from 'rxjs';
import {Response} from 'src/app/commons/models/response';
import {Breadcrumb} from 'src/app/commons/interfaces/breadcrumb';
import {BreadcrumbService} from 'src/app/commons/services/breadcrumb.service';

@Component({
    selector: 'app-lender-index',
    templateUrl: './lender-index.component.html',
    styleUrls: ['./lender-index.component.css']
})
export class LenderIndexComponent implements OnInit {

    page$: Observable<Response<PaginatedResource<Lender>>>;
    items: Breadcrumb[] = [
        {label: "Lenders"}]
    home: Breadcrumb = {label: "Home", routerLink: '/dashboard'}

    constructor(private lenderService: LenderService, private router: Router, private breadcrumbService: BreadcrumbService) {
    }

    ngOnInit(): void {
        this.breadcrumbService.setItems(this.items);
        this.breadcrumbService.setHome(this.home)
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.page$ = this.lenderService.getPage(page).pipe(share())
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

    delete(codeLender: string) {
        this.lenderService.delete(codeLender).subscribe({
            next: (response) => {
                if (response.statusCode == 200)
                    navigateBack(this.router)
            },
            error: (err) => console.log('code lender delete error', err)
        })
    }
}
