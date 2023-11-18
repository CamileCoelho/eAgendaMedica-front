import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
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
    DashboardModule,
    AtividadesModule
  ],  
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
