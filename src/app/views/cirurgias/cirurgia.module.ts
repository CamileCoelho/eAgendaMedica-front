import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CirurgiaService } from './services/cirurgia.service';
import { CirurgiaRoutingModule } from './cirurgia-routing.module';
import { ListarCirurgiasComponent } from './listar-cirurgias/listar-cirurgias.component';
import { InserirCirurgiaComponent } from './inserir-cirurgia/inserir-cirurgia.component';
import { EditarCirurgiaComponent } from './editar-cirurgia/editar-cirurgia.component';
import { ExcluirCirurgiaComponent } from './excluir-cirurgia/excluir-cirurgia.component';
import { MedicoModule } from '../medicos/medico.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { VisualizarCirurgiaComponent } from './visualizar-cirurgia/visualizar-cirurgia.component';

@NgModule({
  declarations: [
    ListarCirurgiasComponent, 
    InserirCirurgiaComponent, 
    EditarCirurgiaComponent, 
    ExcluirCirurgiaComponent,
    VisualizarCirurgiaComponent
  ],
  imports: [
    CommonModule,
    CirurgiaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    MedicoModule
  ],
  providers: [CirurgiaService],
})
export class CirurgiaModule {}
