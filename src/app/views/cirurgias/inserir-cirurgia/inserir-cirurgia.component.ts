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
      horaInicio: ['06:00'],
      horaTermino: ['08:00'],
      detalhes: [''],
      medicoIds: [[]],
    });
    
    this.medicos$ = this.medicoService.selecionarTodos();
  }

  gravar(): void {
    this.cirurgiaService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
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