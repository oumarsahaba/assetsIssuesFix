import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WholesalerService} from "../../../../services/wholesaler.service";
import {Wholesaler} from "../../../../commons/interfaces/wholesaler";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {navigateBack} from "../../../../commons/helpers";
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {ForbiddenError} from "../../../../commons/errors/forbidden-error";
import Swal from "sweetalert2";
import { Observable } from 'rxjs';
import { Response } from 'src/app/commons/models/response';

@Component({
  selector: 'app-wholesaler-index',
  templateUrl: './wholesaler-index.component.html',
  styleUrls: ['./wholesaler-index.component.css']
})
export class WholesalerIndexComponent implements OnInit {

    page : PaginatedResource<Wholesaler>
    page$: Observable<Response<PaginatedResource<Wholesaler>>>
    codeWholesaler : string = ""

    constructor(private wholesalerService: WholesalerService, private router: Router ) {
    }

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.page$ = this.wholesalerService.getPage(this.codeWholesaler, page)
        this.wholesalerService.getPage(this.codeWholesaler, page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<Wholesaler>
                },
                error : (err: AppError) => {
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
