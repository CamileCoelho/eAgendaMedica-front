import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FormsMedicoViewModel } from '../models/forms-medico.view-model';
import { ListarMedicoViewModel } from '../models/listar-medico.view-model';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';

@Injectable()
export class MedicoService {
  
  private API_URL = `https://localhost:7070/api/medicos`;

  constructor(private http: HttpClient) {}

  criar(medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http
    .post<any>(this.API_URL, medico)
    .pipe(map((res) => res.dados));
  }

  editar(id: string, medico: FormsMedicoViewModel): Observable<FormsMedicoViewModel> {
    return this.http
    .put<any>(`${this.API_URL}/${id}`, medico)
    .pipe(map((res) => res.dados));  
  }

  excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  public selecionarPorId(id: string): Observable<FormsMedicoViewModel> {
    return this.http
      .get<any>(`${this.API_URL}/${id}`)
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http
    .get<any>(this.API_URL)
    .pipe(map((res) => res.dados));
  }
  
  public selecionarMedicoCompletoPorId(id: string): Observable<VisualizarMedicoViewModel> {
    return this.http
      .get<any>(this.API_URL + '/visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
