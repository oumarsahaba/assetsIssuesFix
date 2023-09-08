// credit-count-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from "../../../services/dashboard.service";
import { AppError } from "../../../commons/errors/app-error";
import { CreditRequestChart } from "../../../commons/interfaces/credit-request-chart";

@Component({
    selector: 'app-credit-count-chart',
    templateUrl: './credit-count-chart.component.html',
    styleUrls: ['./credit-count-chart.component.css']
})
export class CreditCountChartComponent implements OnInit {
    selectedPeriod: string = 'last30Days'; // Default period
    private chartInstance: Chart | null = null; // Store the reference to the chart instance

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
        this.dashboardService.getCreditCountChartData(period).subscribe({
            next: (response) => {
                let chartData = response.data as CreditRequestChart;
                chartData.labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

                // Destroy the existing chart instance if it exists
                if (this.chartInstance !== null) {
                    this.chartInstance.destroy();
                }

                this.createChart(chartData.labels, chartData.values, period);
            },
            error: (err: AppError) => {
                // Handle error
            }
        });
    }

    private createChart(labels: string[], values: number[], period: string) {
        let chartTitle = this.getChartTitle(period);

        // Format the labels based on the selected period
        switch (period) {
            case 'last30Days':
                // Use the existing date-based labels
                labels = labels.map(date => new Date(date).toLocaleDateString());
                break;
            case 'last3Months':
                // Generate labels with weeks for the last 3 months
                labels = this.generateLast3MonthsWeeks(labels);
                break;
            case 'last6Months':
                // Generate labels with months for the last 6 months
                labels = this.generateLast6MonthsMonths(labels);
                break;
            default:
                // Use the existing labels
                break;
        }

        // Destroy the existing chart instance if it exists
        if (this.chartInstance !== null) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart("creditCountChart", {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: chartTitle,
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

    private generateLast3MonthsWeeks(labels: string[]): string[] {
        // Generate labels with weeks for the last 3 months
        const last3MonthsWeeksLabels = [];
        const today = new Date();

        for (let i = 2; i >= 0; i--) {
            const startDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
            const startDay = startDate.getDate();
            const endDay = endDate.getDate();
            const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
            const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

            // Combine start and end date information
            const label = `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
            last3MonthsWeeksLabels.push(label);
        }

        return last3MonthsWeeksLabels;
    }

    private generateLast6MonthsMonths(labels: string[]): string[] {
        // Generate labels with months for the last 6 months
        const last6MonthsMonthsLabels = [];
        const today = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const month = date.toLocaleString('en-US', { month: 'long' });
            last6MonthsMonthsLabels.push(month);
        }

        return last6MonthsMonthsLabels;
    }


    private getChartTitle(period: string): string {
        switch (period) {
            case 'last30Days':
                return 'Credit Request Count in Last 30 Days';
            case 'last3Months':
                return 'Credit Request Count in Last 3 Months';
            case 'last6Months':
                return 'Credit Request Count in Last 6 Months';
            default:
                return '';
        }
    }
}
