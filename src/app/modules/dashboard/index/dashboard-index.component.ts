import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {DashboardMetrics} from "../../../commons/interfaces/dashboard-metrics";
import {Response} from 'src/app/commons/models/response';
import {Observable, share} from 'rxjs';
import {OverDraftMetrics} from "../../../commons/interfaces/overDraftMetrics";

@Component({
    selector: 'app-dashboard-index',
    templateUrl: './dashboard-index.component.html',
    styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {

    metrics$: Observable<Response<DashboardMetrics>>;
    overdraftMetrics$: Observable<Response<OverDraftMetrics>>;
    selectedPeriod: number = 30;

    constructor(private dashboardService: DashboardService, private router: Router) {
    }

    ngOnInit(): void {
        this.metrics$ = this.dashboardService.getMetrics().pipe(share())

        this.getOverDraftMetrics(this.selectedPeriod);
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event.target.value;
        this.getOverDraftMetrics(this.selectedPeriod);
    }

    private getOverDraftMetrics(dayBefore: number) {
        this.overdraftMetrics$ = this.dashboardService.getOverDraftMetrics(dayBefore).pipe(share())
        this.overdraftMetrics$.subscribe({
            error: (err: AppError) => {
                if (err instanceof NotFoundError)
                    this.router.navigate(['/not-found'])

                if (err instanceof ForbiddenError)
                    this.router.navigate(['/forbidden'])
            }
        })
    }
}
