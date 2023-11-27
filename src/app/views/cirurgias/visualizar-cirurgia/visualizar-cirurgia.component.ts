import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';

@Component({
  selector: 'app-visualizar-cirurgia',
  templateUrl: './visualizar-cirurgia.component.html',
  styleUrls: ['./visualizar-cirurgia.component.scss'],
})
export class VisualizarCirurgiaComponent implements OnInit {
  cirurgiaVM?: VisualizarCirurgiaViewModel;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cirurgiaVM = this.route.snapshot.data['cirurgia'];
  }
}