import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {Router} from "@angular/router";
import {DashboardMetrics} from "../../../commons/interfaces/dashboard-metrics";

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit{

  metrics : DashboardMetrics

  constructor(private dashboardService: DashboardService, private router: Router ) {}

  ngOnInit(): void {
    this.dashboardService.getMetrics()
        .subscribe({
          next: (response) => {
            this.metrics = response.data as DashboardMetrics
          },
          error : (err: AppError) => {
            if (err instanceof NotFoundError)
              this.router.navigate(['/not-found'])

            if (err instanceof ForbiddenError)
              this.router.navigate(['/forbidden'])
          }
        })

  }
}
