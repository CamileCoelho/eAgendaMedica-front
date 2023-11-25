import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.component.html',
  styleUrls: ['./editar-medico.component.scss'],
})
export class EditarMedicoComponent{
  form?: FormGroup;
  
  constructor( private formBuilder: FormBuilder, 
               private medicoService: MedicoService,
               private toastrService: ToastrService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      crm: ['', [Validators.required]],
      especialidade: ['', [Validators.required, Validators.minLength(3)]],
    });
    
    this.form.patchValue(this.route.snapshot.data['medico']);
  }

  gravar(): void {
    this.medicoService.editar(this.route.snapshot.paramMap.get('id')!, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsMedicoViewModel) {    
    this.toastrService.success(
      `O médico "${res.nome}" foi editado com sucesso!`,
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
