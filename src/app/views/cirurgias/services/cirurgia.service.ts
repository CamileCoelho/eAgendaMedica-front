import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListarCirurgiasViewModel } from '../models/listar-cirurgia.view-model';
import { FormsCirurgiaViewModel } from '../models/forms-cirurgia.view-model';
import { VisualizarCirurgiaViewModel } from '../models/visualizar-cirurgia.view-model';

@Injectable()
export class CirurgiaService {
  
  private API_URL = `https://localhost:7070/api/atividades/cirurgias`;

  constructor(private http: HttpClient) {}

  criar(cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    return this.http
    .post<any>(this.API_URL, cirurgia)
    .pipe(map((res) => res.dados));
  }

  editar(id: string, cirurgia: FormsCirurgiaViewModel): Observable<FormsCirurgiaViewModel> {
    return this.http
    .put<any>(`${this.API_URL}/${id}`, cirurgia)
    .pipe(map((res) => res.dados));  
  }

  excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  public selecionarPorId(id: string): Observable<FormsCirurgiaViewModel> {
    return this.http
      .get<any>(`${this.API_URL}/${id}`)
      .pipe(map((res) => res.dados));
  }

  public selecionarTodas(): Observable<ListarCirurgiasViewModel[]> {
    return this.http
    .get<any>(this.API_URL)
    .pipe(map((res) => res.dados));
  }
  
  public selecionarCirurgiaCompletaPorId(id: string): Observable<VisualizarCirurgiaViewModel> {
    return this.http
      .get<any>(this.API_URL + '/visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
