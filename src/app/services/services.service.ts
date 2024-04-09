import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import {CadServico} from '../models/CadServico';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private url = 'CadServico'

  constructor(private http: HttpClient) { }

  public getServicos(): Observable<CadServico[]> {
    return this.http.get<CadServico[]>
    (`${environment.apiUrl}/${this.url}`);
  }

  public addServicos(servico:CadServico):Observable<CadServico[]>{
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<CadServico[]>
    (`${environment.apiUrl}/${this.url}`, servico, { headers });
  }

  public editServico(servico:CadServico){
    return this.http.put<CadServico>(`${environment.apiUrl}/${this.url}/${servico.id}`, servico);
  }

  
  

  public removerServico(id: number){
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  public marcarComoConcluido(id: number) {
    return this.http.put<CadServico>(`${environment.apiUrl}/${this.url}/marcarComoConcluido/${id}`, null);
}

public getServicosConcluidos(): Observable<CadServico[]> {
  return this.http.get<CadServico[]>(`${environment.apiUrl}/${this.url}/concluido`);
}


  
}
