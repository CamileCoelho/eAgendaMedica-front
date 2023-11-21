// import { Observable, map } from 'rxjs';
// import { Injectable } from '@angular/core';

// import { CanActivateFn, UrlTree, Router, CanActivate } from '@angular/router';
// import { UsuarioService } from '../services/usuario.service';

// @Injectable()
// export class LoginGuard implements CanActivate {

//   constructor(
//     private usuarioService: UsuarioService,
//     private router: Router
//   ) { }

//   canActivate(): Observable<boolean> {
//     return this.usuarioService.usuarioLogado.pipe(
//       map(usuarioLogado => {
//         if (!usuarioLogado)
//           return true;

//         this.router.navigate(['/dashboard']);
//         return false;
//       })
//     )
//   }
// }


import { Observable, map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, UrlTree, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);

  return inject(AuthService)
    .obterUsuarioAutenticado()
    .pipe(
      map((usuario) => {
        if (usuario) return router.parseUrl('/dashboard');

        return true;
      })
    );
};
