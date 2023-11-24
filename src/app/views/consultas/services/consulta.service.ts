import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListarConsultasViewModel } from '../models/listar-consulta.view-model';
import { FormsConsultaViewModel } from '../models/forms-consulta.view-model';
import { VisualizarConsultaViewModel } from '../models/visualizar-consulta.view-model';

@Injectable()
export class ConsultaService {
  
  private API_URL = `https://localhost:7070/api/atividades/consultas`;

  constructor(private http: HttpClient) {}

  criar(consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {
    return this.http
    .post<any>(this.API_URL, consulta)
    .pipe(map((res) => res.dados));
  }

  editar(id: string, consulta: FormsConsultaViewModel): Observable<FormsConsultaViewModel> {
    return this.http
    .put<any>(`${this.API_URL}/${id}`, consulta)
    .pipe(map((res) => res.dados));  
  }

  excluir(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  public selecionarPorId(id: string): Observable<FormsConsultaViewModel> {
    return this.http
      .get<any>(`${this.API_URL}/${id}`)
      .pipe(map((res) => res.dados));
  }

  public selecionarTodas(): Observable<ListarConsultasViewModel[]> {
    return this.http
    .get<any>(this.API_URL)
    .pipe(map((res) => res.dados));
  }
  
  public selecionarConsultaCompletaPorId(id: string): Observable<VisualizarConsultaViewModel> {
    return this.http
      .get<any>(this.API_URL + '/visualizacao-completa/' + id)
      .pipe(map((res) => res.dados));
  }
}
