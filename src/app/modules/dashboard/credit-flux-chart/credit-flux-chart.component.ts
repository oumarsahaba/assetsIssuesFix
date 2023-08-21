import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {DashboardService} from "../../../services/dashboard.service";
import {AppError} from "../../../commons/errors/app-error";
import {CreditRequestChart} from "../../../commons/interfaces/credit-request-chart";

@Component({
  selector: 'app-credit-flux-chart',
  templateUrl: './credit-flux-chart.component.html',
  styleUrls: ['./credit-flux-chart.component.css']
})
export class CreditFluxChartComponent implements OnInit {
    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {

        this.dashboardService.getCreditFluxChartData()
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
        new Chart("creditFluxChart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Credit Request Flux last 30 days',
                    data: values,
                    backgroundColor:'rgba(217,140,62,0.43)',
                    borderColor: 'rgb(247,162,72)',
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
