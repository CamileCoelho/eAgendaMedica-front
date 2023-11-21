import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioTokenViewModel } from '../auth/models/usuario-token.view-module';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit{
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  usuario$?: Observable < UsuarioTokenViewModel | undefined > ;

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService, 
              private router: Router) {}

  ngOnInit(): void {
    this.usuario$ = this.authService.obterUsuarioAutenticado();
  }

  sair(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isSidenavOpen: boolean = false;

  toggleSidenavVisibility() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
