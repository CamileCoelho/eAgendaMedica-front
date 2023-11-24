import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoRoutingModule } from './medico-routing.module';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MedicoService } from './services/medico.service';
import { InserirMedicoComponent } from './inserir-medico/inserir-medico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarMedicoComponent } from './editar-medico/editar-medico.component';
import { ExcluirMedicoComponent } from './excluir-medico/excluir-medico.component';

@NgModule({
  declarations: [
    ListarMedicosComponent, 
    InserirMedicoComponent, 
    EditarMedicoComponent, 
    ExcluirMedicoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [MedicoService],
})
export class MedicoModule {}
