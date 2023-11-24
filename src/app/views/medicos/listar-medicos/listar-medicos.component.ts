import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicoService } from '../services/medico.service';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.scss'],
})
export class ListarMedicosComponent implements OnInit {
  medicos$?: Observable<ListarMedicoViewModel[]>;

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.medicos$ = this.medicoService.selecionarTodos();
  }
}
