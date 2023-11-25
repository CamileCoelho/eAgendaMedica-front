import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';

@Component({
  selector: 'app-excluir-medico',
  templateUrl: './excluir-medico.component.html',
  styleUrls: ['./excluir-medico.component.scss'],
})
export class ExcluirMedicoComponent implements OnInit {
  medicoVM?: VisualizarMedicoViewModel;

  constructor(
    private medicoService: MedicoService,    
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.medicoVM = this.route.snapshot.data['medico'];
  }

  gravar(): void {
    this.medicoService.excluir(this.medicoVM!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    });
  }

  processarSucesso() {
    this.toastrService.success(
      `O médico "${this.medicoVM!.nome}" foi excluído com sucesso!`,
      'Sucesso'
    );
    this.router.navigate(['/medicos', 'listar']);
  }

  processarFalha(erro: any) {
    const mensagemErro = erro.error.erros.length > 0
                          ? erro.error.erros[0]
                          : 'Ocorreu um erro desconhecido.';

    this.toastrService.error(
      `${mensagemErro}`,
      'Erro'
    );
    
    this.router.navigate(['/medicos', 'listar']);
  }
}