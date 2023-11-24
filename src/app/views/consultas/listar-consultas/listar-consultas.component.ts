import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConsultaService } from '../services/consulta.service';
import { ListarConsultasViewModel } from '../models/listar-consulta.view-model';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.scss'],
})
export class ListarConsultasComponent implements OnInit {
  consultas$?: Observable<ListarConsultasViewModel[]>;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.consultas$ = this.consultaService.selecionarTodas()}
}
