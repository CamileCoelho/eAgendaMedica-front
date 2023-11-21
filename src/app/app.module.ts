import { APP_INITIALIZER, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AtividadesModule } from './views/atividades/atividades.module';
import { LoginModule } from './views/login/login.module';
import { RegistroModule } from './views/registro/registro.module';
import { AuthService } from './core/auth/services/auth.service';
import { httpTokenInterceptor } from './core/auth/services/http-token.interceptor';
import './extensions/form-group.extension';

function logarUsuarioSalvoFactory(authService: AuthService) {
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    
    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,
    AtividadesModule
  ],  
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
