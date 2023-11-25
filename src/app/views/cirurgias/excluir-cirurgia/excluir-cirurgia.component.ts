import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CirurgiaService } from '../services/cirurgia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-cirurgia',
  templateUrl: './excluir-cirurgia.component.html',
  styleUrls: ['./excluir-cirurgia.component.scss'],
})
export class ExcluirCirurgiaComponent implements OnInit {
  cirurgiaVM?: VisualizarCirurgiaViewModel;

  constructor(
    private cirurgiaService: CirurgiaService,    
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cirurgiaVM = this.route.snapshot.data['cirurgia'];
    console.log(this.cirurgiaVM?.medicos)
  }

  gravar() {
    this.cirurgiaService.excluir(this.cirurgiaVM!.id).subscribe(() => {
      this.toastrService.success(
       // `A cirurgia "${this.cirurgiaVM?.nome}" foi excluída com sucesso!`,
        //do dia tal as tal horas
        'Sucesso'
      );

      this.router.navigate(['/cirurgias', 'listar']);
    });
  }
}