// dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboardService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  servicesCount: number = 0;
  totalRevenue: number = 0;
  completedServicesCount: number = 0;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboard.getDashboardData().subscribe(
      (data) => {
        this.servicesCount = data.quantidadeServicos;
        this.totalRevenue = data.totalFaturamento;
        this.completedServicesCount = data.quantidadeServicosConcluidos;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
