import {Component, Input, OnInit} from '@angular/core';
import {PaginatedResource} from "../../../../commons/interfaces/paginated-resource";
import {Router} from "@angular/router";
import {CommissionPlanService} from "../../../../services/commission-plan.service";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {CommissionPlan} from "../../../../commons/interfaces/commission-plan";

@Component({
  selector: 'app-commission-plan-index',
  templateUrl: './commission-plan-index.component.html',
  styleUrls: ['./commission-plan-index.component.css']
})
export class CommissionPlanIndexComponent implements OnInit {

    page : PaginatedResource<CommissionPlan> = {
        content : [],
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: false
    }

    @Input()
    code: string

    @Input()
    type: string

    constructor(private commissionPlanService: CommissionPlanService,
                private router: Router) {}

    ngOnInit(): void {
        this.goToPage()
    }

    goToPage(page: number = 0) {
        this.commissionPlanService.getAll(this.code, this.type, page)
            .subscribe({
                next: (response) => {
                    this.page = response.data as PaginatedResource<CommissionPlan>
                },
                error : (err: AppError) => {
                    if (err instanceof NotFoundError)
                        this.router.navigate(['**'])
                }
            })

    }

    delete(id: number) {

    }
}
