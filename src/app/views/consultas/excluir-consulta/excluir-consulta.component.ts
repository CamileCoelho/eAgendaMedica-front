import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from '../services/consulta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-consulta',
  templateUrl: './excluir-consulta.component.html',
  styleUrls: ['./excluir-consulta.component.scss'],
})
export class ExcluirConsultaComponent implements OnInit {
  consultaVM?: VisualizarConsultaViewModel;

  constructor(
    private consultaService: ConsultaService,    
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultaVM = this.route.snapshot.data['consulta'];
  }

  gravar() {
    this.consultaService.excluir(this.consultaVM!.id).subscribe(() => {
      this.toastrService.success(
       // `A consulta "${this.consultaVM?.nome}" foi excluída com sucesso!`,
        //do dia tal as tal horas
        'Sucesso'
      );

      this.router.navigate(['/consultas', 'listar']);
    });
  }
}