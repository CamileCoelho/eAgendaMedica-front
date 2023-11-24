import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultaService } from './services/consulta.service';
import { ConsultaRoutingModule } from './consulta-routing.module';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { InserirConsultaComponent } from './inserir-consulta/inserir-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { ExcluirConsultaComponent } from './excluir-consulta/excluir-consulta.component';
import { MedicoModule } from '../medicos/medico.module';

@NgModule({
  declarations: [
    ListarConsultasComponent, 
    InserirConsultaComponent, 
    EditarConsultaComponent, 
    ExcluirConsultaComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MedicoModule
  ],
  providers: [ConsultaService],
})
export class ConsultaModule {}
