import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicoService } from '../services/medico.service';
import { Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss'],
})
export class InserirMedicoComponent implements OnInit {
  form?: FormGroup;

  constructor( private formBuilder: FormBuilder, 
               private medicoService: MedicoService,
               private toastrService: ToastrService,
               private router: Router) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [''],
      crm: [''],
      especialidade: [''],
    });
  }

  gravar(): void {
    this.medicoService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso(res: FormsMedicoViewModel) {
    this.toastrService.success(
      `O médico "${res.nome}" foi cadastrado com sucesso!`,
      'Sucesso'
    );
    this.router.navigate(['/medicos', 'listar']);
  }

  processarFalha(erro: any) {
    const mensagemErro = erro.error.erros.length > 0
                          ? erro.error.erros[0]
                          : 'Ocorreu um erro desconhecido.';

    this.toastrService.warning(
      `${mensagemErro}`,
      'Aviso'
    );
  }
}
