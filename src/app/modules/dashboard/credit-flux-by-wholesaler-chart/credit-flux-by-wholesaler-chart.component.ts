import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable, share } from 'rxjs';
import { AppError } from 'src/app/commons/errors/app-error';
import { ChartDataset } from 'src/app/commons/interfaces/chart-dataset';
import { Response } from 'src/app/commons/models/response';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-credit-flux-by-wholesaler-chart',
  templateUrl: './credit-flux-by-wholesaler-chart.component.html',
  styleUrls: ['./credit-flux-by-wholesaler-chart.component.css']
})
export class CreditFluxByWholesalerChartComponent {
  selectedPeriod: number = 30; // Default period
  chart: Chart | null = null; // Store the chart instance
  data$: Observable<Response<ChartDataset>>


  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
      Chart.register(...registerables);
      this.updateChart(this.selectedPeriod); // Initialize chart with default period
  }

  onPeriodChange(event: any) {
      this.selectedPeriod = event.target.value;
      this.updateChart(this.selectedPeriod); // Update chart when period changes
  }

  private updateChart(dayBefore: number) {
      this.data$ = this.dashboardService.getCreditFluxByWholesalerChartData(dayBefore).pipe(share())
      this.data$.subscribe({
          next: (response) => {
              let chartData = response.data as ChartDataset;
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
      this.chart = new Chart("creditFluxByWholesalerChart", {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: chartTitle,
                  data: values,
                  backgroundColor: 'rgba(168, 24, 53, 0.7)',
                  borderColor: 'rgb(255, 45, 50)',
                  borderRadius: 15
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
              return 'Credit Request flux by Wholesaler in Last 30 Days';
          case '90':
              return 'Credit Request flux by Wholesaler in Last 3 Months';
          case '180':
              return 'Credit Request flux by Wholesaler in Last 6 Months';
          default:
              return '';
      }
  }
}
