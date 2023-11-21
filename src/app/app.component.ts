import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { UsuarioTokenViewModel } from './core/auth/models/usuario-token.view-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eAgendaMedica';
  estaCarregando: boolean = true;
  usuario$?: Observable < UsuarioTokenViewModel | undefined > ;

  constructor(private router: Router, private authService: AuthService) {
    
  }

  ngOnInit() {    
    this.usuario$ = this.authService.obterUsuarioAutenticado();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.estaCarregando = true;
      } 
      else if (event instanceof NavigationEnd || 
               event instanceof NavigationError || 
               event instanceof NavigationCancel ) 
      {
        this.estaCarregando = false;
      }
    });
  }
}
