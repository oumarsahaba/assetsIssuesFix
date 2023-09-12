import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { AppError } from "../../../commons/errors/app-error";
import { CreditRequestChart } from "../../../commons/interfaces/credit-request-chart";

@Component({
    selector: 'app-credit-count-by-agent-chart',
    templateUrl: './credit-count-by-agent-chart.component.html',
    styleUrls: ['./credit-count-by-agent-chart.component.css']
})
export class CreditCountByAgentChartComponent implements OnInit {
    selectedPeriod: number = 30; // Default period
    chart: Chart | null = null; // Store the chart instance

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        Chart.register(...registerables);
        this.updateChart(this.selectedPeriod); // Initialize chart with default period
    }

    onPeriodChange(event: any) {
        this.selectedPeriod = event.target.value;
        this.updateChart(this.selectedPeriod); // Update chart when period changes
    }

    private updateChart(dayBefore: number) {
        this.dashboardService.getCreditCountByAgentChartData(dayBefore).subscribe({
            next: (response) => {
                let chartData = response.data as CreditRequestChart;
                chartData.labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

                // Destroy the previous chart if it exists
                if (this.chart) {
                    this.chart.destroy();
                }

                this.createChart(chartData.labels, chartData.values);
            },
            error: (err: AppError) => {
                // Handle error
            }
        });
    }

    private createChart(labels: string[], values: number[]) {
        const chartTitle = this.getChartTitle(this.selectedPeriod.toString());
        this.chart = new Chart("creditCountByAgentChart", {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
                    data: values,
                    borderColor: 'rgb(39, 44, 92, 0.7)',
                    backgroundColor: 'rgba(39, 44, 92, 0.8)',
                    borderRadius: 20
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
            case '30':
                return 'Credit Request count by agent in Last 30 Days';
            case '90':
                return 'Credit Request count by agent in Last 3 Months';
            case '180':
                return 'Credit Request count by agent in Last 6 Months';
            default:
                return '';
        }
    }
}