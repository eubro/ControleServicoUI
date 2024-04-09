// dashboard.service.ts

import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private servicesService: ServicesService) {}

  public getDashboardData(): Observable<any> {
    return forkJoin([
      this.servicesService.getServicos(), 
      this.servicesService.getServicosConcluidos() 
    ]).pipe(
      map(([servicos, servicosConcluidos]) => {
        const quantidadeServicos = servicos.length;
        const quantidadeServicosConcluidos = servicosConcluidos.length;
        const totalFaturamento = this.calcularTotalFaturamento(servicos);

        return {
          quantidadeServicos,
          quantidadeServicosConcluidos,
          totalFaturamento
        };
      })
    );
  }

  private calcularTotalFaturamento(servicos: any[]): number {
    return servicos.reduce((total, servico) => total + servico.valor, 0);
  }
}
