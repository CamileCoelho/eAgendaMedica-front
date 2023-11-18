import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenViewModel } from 'src/app/core/auth/models/token.view-module';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form!.get(nome)!.touched && this.form!.get(nome)!.invalid;
  }

  login() {
    if (this.form?.invalid) {
      const erros = this.form.validate();

      for (let erro of erros) this.toastrService.warning(erro);

      return;
    }

    this.authService.login(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  // login() {
  //   if (this.form?.invalid) {
  //     for (const controlName in this.form.controls) {
  //       if (this.form.controls.hasOwnProperty(controlName)) {
  //         const control = this.form.get(controlName);
  //         if (control?.invalid) {
  //           const errorMessage = `Campo ${controlName} é obrigatório.`;
  //           this.toastrService.warning(errorMessage);
  //         }
  //       }
  //     }
  //     return;
  //   }
  
  //   this.authService.login(this.form?.value).subscribe({
  //     next: (res) => this.processarSucesso(res),
  //     error: (err) => this.processarFalha(err),
  //   });
  // }

  processarSucesso(res: TokenViewModel) {
    this.toastrService.success(
      'Seja bem-vindo, ' + res.usuarioToken.nome + '!',
      'Sucesso'
    );

    this.router.navigate(['/dashboard']);
  }

  processarFalha(err: Error) {
    this.toastrService.error(err.message, 'Erro');
  }
}
