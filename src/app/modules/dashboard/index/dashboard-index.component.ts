import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {DashboardMetrics} from "../../../commons/interfaces/dashboard-metrics";
import {Response} from 'src/app/commons/models/response';
import {Observable, share} from 'rxjs';
import {OverDraft} from "../../../commons/interfaces/overdraft";

@Component({
    selector: 'app-dashboard-index',
    templateUrl: './dashboard-index.component.html',
    styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {

    metrics$: Observable<Response<DashboardMetrics>>;
    overdraft$: Observable<Response<OverDraft>>;
    sumOverdraft$: Observable<Response<OverDraft>>;
    selectedPeriod: number = 30;
    selectedPeriod1: number = 30;

    constructor(private dashboardService: DashboardService, private router: Router) {
    }

    ngOnInit(): void {
        this.metrics$ = this.dashboardService.getMetrics().pipe(share())
        this.metrics$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
        this.updateOverDraft(this.selectedPeriod);
        this.updateOverDraftFlux(this.selectedPeriod);

    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event.target.value;
        this.updateOverDraft(this.selectedPeriod);

    }
    onPeriodChange1(event: any) {
        this.selectedPeriod1 = event.target.value;
        this.updateOverDraftFlux(this.selectedPeriod1);

    }
    private updateOverDraft(dayBefore: number) {
        this.overdraft$ = this.dashboardService.getOverDraft(dayBefore).pipe(share())
        this.overdraft$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }

    private updateOverDraftFlux(dayBefore: number) {
        this.sumOverdraft$ = this.dashboardService.getSumAmountOverDraft(dayBefore).pipe(share())
        this.sumOverdraft$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }
}
