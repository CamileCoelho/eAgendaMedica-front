import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { CirurgiaService } from '../services/cirurgia.service';
import { Router } from '@angular/router';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';
import { ToastrService } from 'ngx-toastr';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';
import { Observable } from 'rxjs';
import { MedicoService } from '../../medicos/services/medico.service';

@Component({
  selector: 'app-inserir-cirurgia',
  templateUrl: './inserir-cirurgia.component.html',
  styleUrls: ['./inserir-cirurgia.component.scss'],
})
export class InserirCirurgiaComponent implements OnInit {
  form?: FormGroup;
  public medicos$!: Observable<ListarMedicoViewModel[]>;

  constructor( private formBuilder: FormBuilder, 
               private cirurgiaService: CirurgiaService,
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
      medicoIds: [[]],
    });
    
    this.medicos$ = this.medicoService.selecionarTodos();
  }

  gravar(): void {
    this.cirurgiaService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso(res: FormsCirurgiaViewModel) {    
    const dataFormatada = this.formatarData(res.dataInicio);

    this.toastrService.success(
      `A cirurgia do dia "${dataFormatada}" das "${res.horaInicio}" foi cadastrada com sucesso!`,
      'Sucesso'
    );
    this.router.navigate(['/cirurgias', 'listar']);
  }

  processarFalha(erro: any) {
    var mensagemErro = '';
                  
    if(erro.error.Erros === undefined){
      mensagemErro = 'Você deve preencher todos os campos, com exessão dos detalhes.';
    }
    else{
      mensagemErro = erro.error.Erros.length > 0
                   ? erro.error.Erros[0]
                   : 'Ocorreu um erro desconhecido.';
    }
    
    if(erro.error.erros !== undefined){
      mensagemErro = erro.error.erros.length > 0
      ? erro.error.erros[0]
      : 'Ocorreu um erro desconhecido.';
    }

    if(mensagemErro.includes('Cannot pass null model to Validate.')){
      mensagemErro = 'Você deve preencher todos os campos, com exessão dos detalhes.';
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