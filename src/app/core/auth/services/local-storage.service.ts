import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-module";

@Injectable()
export class LocalStorageService {
  private chaveLocalStorage: string = 'e-agenda-medica-dados';

  public salvarDadosLocaisUsuario(usuario: TokenViewModel) {
    const jsonString = JSON.stringify(usuario);
    
    localStorage.setItem(this.chaveLocalStorage, jsonString);
  }

  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chaveLocalStorage);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString) as TokenViewModel;
  }

  public limparDadosLocais(): void {
    localStorage.setItem(this.chaveLocalStorage, '');
  }


  
  // public salvarDadosLocaisUsuario(resposta: TokenViewModel): void {
  //   this.salvarTokenUsuario(resposta.chave);
  //   this.salvarDataExpiracaoToken(resposta.dataExpiracao);
  //   this.salvarUsuario(resposta.usuarioToken);
  // }

  // public salvarTokenUsuario(token: string) {
  //   localStorage.setItem('eAgendaMedica.token', token);
  // }

  // public salvarUsuario(usuario: UsuarioTokenViewModel) {
  //   const jsonString = JSON.stringify(usuario);

  //   localStorage.setItem('eAgendaMedica.usuario', jsonString);
  // }

  // public salvarDataExpiracaoToken(dataExpiracao: Date) {
  //   localStorage.setItem('eAgendaMedica.dataExpiracaoToken', dataExpiracao.toString());
  // }

  // public obterUsuarioSalvo() {
  //   const usuarioJson = localStorage.getItem('eAgendaMedica.usuario');

  //   if (usuarioJson)
  //     return JSON.parse(usuarioJson) as UsuarioTokenViewModel;

  //   return null;
  // }

  // public obterTokenUsuario(): string {
  //   return localStorage.getItem('eAgendaMedica.token') ?? '';
  // }

  // public obterDataExpiracaoToken(): Date | null {
  //   const dataExpiracaoJson = localStorage.getItem('eAgendaMedica.dataExpiracaoToken');

  //   if (dataExpiracaoJson)
  //     return new Date(dataExpiracaoJson);

  //   return null;
  // }

  // public limparDadosLocais() {
  //   localStorage.removeItem('eAgendaMedica.token');
  //   localStorage.removeItem('eAgendaMedica.dataExpiracaoToken');
  //   localStorage.removeItem('eAgendaMedica.usuario');
  // }
}
