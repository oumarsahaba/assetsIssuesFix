import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {DashboardService} from "../../../services/dashboard.service";
import {DashboardMetrics} from "../../../commons/interfaces/dashboard-metrics";
import {AppError} from "../../../commons/errors/app-error";
import {NotFoundError} from "../../../commons/errors/not-found-error";
import {ForbiddenError} from "../../../commons/errors/forbidden-error";
import {CreditCountChart} from "../../../commons/interfaces/credit-count-chart";

@Component({
  selector: 'app-credit-chart',
  templateUrl: './credit-chart.component.html',
  styleUrls: ['./credit-chart.component.css']
})
export class CreditChartComponent implements OnInit {
    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {

        this.dashboardService.getCreditCountChartData()
            .subscribe({
                next: (response) => {
                    let chartData = response.data as CreditCountChart

                    this.createChart(chartData.labels, chartData.values)
                },
                error : (err: AppError) => {
                }
            })

        Chart.register(...registerables);


    }

    private createChart(labels: string[], values: number[]) {
        new Chart("creditChart", {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Credit Request last 30 days',
                    data: values,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
