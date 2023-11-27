import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';

@Component({
  selector: 'app-visualizar-consulta',
  templateUrl: './visualizar-consulta.component.html',
  styleUrls: ['./visualizar-consulta.component.scss'],
})
export class VisualizarConsultaComponent implements OnInit {
  consultaVM?: VisualizarConsultaViewModel;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.consultaVM = this.route.snapshot.data['consulta'];
  }
}