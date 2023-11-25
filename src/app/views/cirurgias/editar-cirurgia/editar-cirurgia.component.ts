import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CirurgiaService } from '../services/cirurgia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';
import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '../../medicos/services/medico.service';
import { Observable } from 'rxjs';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.view-model';

@Component({
  selector: 'app-editar-cirurgia',
  templateUrl: './editar-cirurgia.component.html',
  styleUrls: ['./editar-cirurgia.component.scss'],
})
export class EditarCirurgiaComponent{
  form?: FormGroup;  
  public medicos$!: Observable<ListarMedicoViewModel[]>;

  constructor(  private formBuilder: FormBuilder, 
                private cirurgiaService: CirurgiaService,
                private medicoService: MedicoService,
                private toastrService: ToastrService,
                private route: ActivatedRoute,
                private router: Router ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dataInicio: [''],
      dataTermino: [''],
      horaInicio: ['06:00'],
      horaTermino: ['08:00'],
      detalhes: [''],
      medicoIds: [[]],
    });
    
    this.medicos$ = this.medicoService.selecionarTodos();

    this.form.patchValue(this.route.snapshot.data['cirurgia']);
  }

  gravar(): void {
    this.cirurgiaService.editar(this.route.snapshot.paramMap.get('id')!, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsCirurgiaViewModel) {    
    const dataFormatada = this.formatarData(res.dataInicio);

    this.toastrService.success(
      `A cirurgia do dia "${dataFormatada}" das "${res.horaInicio}" foi editada com sucesso!`,
      'Sucesso'
    );
    this.router.navigate(['/cirurgias', 'listar']);
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
