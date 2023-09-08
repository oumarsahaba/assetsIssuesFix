// credit-flux-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { AppError } from "../../../commons/errors/app-error";
import { CreditRequestChart } from "../../../commons/interfaces/credit-request-chart";

@Component({
    selector: 'app-credit-flux-chart',
    templateUrl: './credit-flux-chart.component.html',
    styleUrls: ['./credit-flux-chart.component.css']
})
export class CreditFluxChartComponent implements OnInit {
    selectedPeriod: string = 'last30Days'; // Default period

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.updateChart(this.selectedPeriod); // Initialize chart with default period
        Chart.register(...registerables);
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event.target.value;
        this.updateChart(this.selectedPeriod); // Update chart when period changes
    }

    private updateChart(period: string) {
        this.dashboardService.getCreditFluxChartData().subscribe({
            next: (response) => {
                let chartData = response.data as CreditRequestChart;

                // Sort the labels array in ascending order
                chartData.labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

                this.createChart(chartData.labels, chartData.values, period);
            },
            error: (err: AppError) => {
                // Handle error
            }
        });
    }

    private createChart(labels: string[], values: number[], period: string) {
        const chartTitle = this.getChartTitle(period);

        new Chart("creditFluxChart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: values,
                    backgroundColor: 'rgba(217,140,62,0.43)',
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

    private getChartTitle(period: string): string {
        switch (period) {
            case 'last30Days':
                return 'Credit Request Flux last 30 Days';
            case 'last3Months':
                return 'Credit Request Flux last 3 Months';
            case 'last6Months':
                return 'Credit Request Flux last 6 Months';
            default:
                return '';
        }
    }
}
