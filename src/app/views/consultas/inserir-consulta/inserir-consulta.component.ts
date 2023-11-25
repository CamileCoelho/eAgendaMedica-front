import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import { Router } from '@angular/router';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { Observable } from 'rxjs';
import { MedicoService } from '../../medicos/services/medico.service';
import { WriteVarExpr } from '@angular/compiler';

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
      dataTermino: [''],
      horaInicio: ['06:00'],
      horaTermino: ['07:00'],
      detalhes: [''],
      medicoId: [''],
    });
    
    this.medicos$ = this.medicoService.selecionarTodos();
  }

  gravar(): void {
    this.consultaService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (erro) => this.processarFalha(erro),
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

  processarFalha(erro: any) {
    var mensagemErro = '';
                  
    if(erro.error.erros === undefined){
      mensagemErro = 'Você deve preencher todos os campos, com exessão dos detalhes.';
    }
    else{
      mensagemErro = erro.error.erros.length > 0
                   ? erro.error.erros[0]
                   : 'Ocorreu um erro desconhecido.';
    }
    
    if(erro.error.Erros !== undefined){
      mensagemErro = erro.error.Erros.length > 0
      ? erro.error.Erros[0]
      : 'Ocorreu um erro desconhecido.';
    }
   
    this.toastrService.warning(
      `${mensagemErro}`,
      'Aviso'
    );
  }
  
  formatarData(data: any): string {
    const dataObj = new Date(data);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const ano = dataObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  } 
}