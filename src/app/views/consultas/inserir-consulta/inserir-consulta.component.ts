import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import { Router } from '@angular/router';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { Observable } from 'rxjs';
import { MedicoService } from '../../medicos/services/medico.service';

@Component({
  selector: 'app-inserir-consulta',
  templateUrl: './inserir-consulta.component.html',
  styleUrls: ['./inserir-consulta.component.scss'],
})
export class InserirConsultaComponent implements OnInit {
  form?: FormGroup;
  public medicos$!: Observable<ListarMedicoViewModel[]>;

  constructor( private formBuilder: FormBuilder, 
               private consultaService: ConsultaService,
               private medicoService: MedicoService,
               private toastrService: ToastrService,
               private router: Router ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dataInicio: [''],
      horaInicio: ['06:00'],
      horaTermino: ['08:00'],
      detalhes: [''],
      medicoId: [''],
    });
    
    this.medicos$ = this.medicoService.selecionarTodos();
  }

  gravar(): void {
    this.consultaService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsConsultaViewModel) {    
    const dataFormatada = this.formatarData(res.dataInicio);

    this.toastrService.success(
      `A consulta do dia "${dataFormatada}" das "${res.horaInicio}" foi cadastrada com sucesso!`,
      'Sucesso'
    );
    this.router.navigate(['/consultas', 'listar']);
  }

  processarFalha(err: any) {
    console.error('Erro:', err);
  }
  
  formatarData(data: any): string {
    const dataObj = new Date(data);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const ano = dataObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  } 
}