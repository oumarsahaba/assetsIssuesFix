import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {CreditRequestChart} from "../../../commons/interfaces/credit-request-chart";

@Component({
  selector: 'app-credit-count-chart',
  templateUrl: './credit-count-chart.component.html',
  styleUrls: ['./credit-count-chart.component.css']
})
export class CreditCountChartComponent implements OnInit {
    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {

        this.dashboardService.getCreditCountChartData()
            .subscribe({
                next: (response) => {
                    let chartData = response.data as CreditRequestChart

                    this.createChart(chartData.labels, chartData.values)
                },
                error : (err: AppError) => {
                }
            })

        Chart.register(...registerables);


    }

    private createChart(labels: string[], values: number[]) {
        new Chart("creditCountChart", {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Credit Request Count last 30 days',
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
