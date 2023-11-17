import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MedicoService } from '../services/medico.service';
import { Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';

@Component({
  selector: 'app-inserir-medico',
  templateUrl: './inserir-medico.component.html',
  styleUrls: ['./inserir-medico.component.scss'],
})
export class InserirMedicoComponent implements OnInit {
  form?: FormGroup;

  constructor( private formBuilder: FormBuilder, 
               private medicoService: MedicoService,
               private router: Router ) {}

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
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsMedicoViewModel) {
    this.router.navigate(['/medicos', 'listar']);
  }

  processarFalha(err: any) {
    console.error('Erro:', err);
  }
}
