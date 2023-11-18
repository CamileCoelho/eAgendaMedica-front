import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AtividadesComponent } from './atividades.component';

@NgModule({
  declarations: [AtividadesComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
})
export class AtividadesModule {}
