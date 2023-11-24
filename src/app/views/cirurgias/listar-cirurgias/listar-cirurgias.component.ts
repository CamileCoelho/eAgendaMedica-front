import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CirurgiaService } from '../services/cirurgia.service';
import { ListarCirurgiasViewModel } from '../models/listar-cirurgia.view-model';

@Component({
  selector: 'app-listar-cirurgias',
  templateUrl: './listar-cirurgias.component.html',
  styleUrls: ['./listar-cirurgias.component.scss'],
})
export class ListarCirurgiasComponent implements OnInit {
  cirurgias$?: Observable<ListarCirurgiasViewModel[]>;

  constructor(private cirurgiaService: CirurgiaService) {}

  ngOnInit(): void {
    this.cirurgias$ = this.cirurgiaService.selecionarTodas()}
}
