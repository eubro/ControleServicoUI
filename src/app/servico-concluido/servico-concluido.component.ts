import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Observable } from 'rxjs';
import { CadServico } from '../models/CadServico';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-servico-concluido',
  templateUrl: './servico-concluido.component.html',
  styleUrls: ['./servico-concluido.component.css']
})
export class ServicoConcluidoComponent implements OnInit {
  servicosConcluidos$: Observable<CadServico[]>;
  public servicoSelecionado: CadServico;
  public servicoForm: FormGroup;

  constructor(private services: ServicesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obterServicosConcluidos();
    //this.criarForm();
  }

  obterServicosConcluidos() {
    this.servicosConcluidos$ = this.services.getServicosConcluidos();
  }


  servicoSelect(servico:CadServico){
    this.servicoSelecionado = servico;
    this.servicoForm = this.fb.group({
      nome: [servico.nome, Validators.required],
      valor: [servico.valor, Validators.required],
      numero: [servico.numero, Validators.required],
      descricao: [servico.descricao, Validators.required],
    });
    
    
  }
  /*criarForm() {
    this.servicoForm = this.fb.group({
      nome: [''],
      valor: [''],
      numero: [''],
      descricao: ['']
    });
  */ 

}
