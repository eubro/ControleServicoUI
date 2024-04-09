import { Component, EventEmitter, Input, OnInit, Output, NgZone } from '@angular/core';
import { CadServico } from '../models/CadServico';
import { ServicesService } from '../services/services.service';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-novo-servico',
  templateUrl: './novo-servico.component.html',
  styleUrls: ['./novo-servico.component.css']
})
export class NovoServicoComponent implements OnInit {
  @Output() servico: CadServico = new CadServico();
  formSubmitted: boolean = false;

  constructor(private service: ServicesService,  private toast:NgToastService){}

  ngOnInit(): void {
    this.servico = new CadServico();
      
  }

  createServico(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.service.addServicos(this.servico).subscribe(
        () => {
          this.toast.success({detail:"Perfeito", summary:"Serviço adicionado com sucesso", duration: 3000})
          form.reset();
        },
        (error) => {
          console.error('Erro ao adicionar serviço:', error);
        }

      );
    }
    
  }
}

