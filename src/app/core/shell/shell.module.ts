import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion'; 

@NgModule({
  declarations: [ShellComponent],
  imports: [CommonModule, SharedModule, MatToolbarModule, MatSidenavModule, MatExpansionModule],
  exports: [ShellComponent],
})
export class ShellModule {}
