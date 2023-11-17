import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { ListarMedicosComponent as ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicoService } from './services/medico.service';
import { InserirMedicoComponent as InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListarMedicosComponent, InserirMedicoComponent],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [MedicoService],
})
export class MedicoModule {}
