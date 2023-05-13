import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { DataPropertyGetterPipe } from './custom-table/data-property-getter.pipe';



@NgModule({
  exports:[
    GenericTableComponent,
    CustomTableComponent
  ],
  declarations: [
    GenericTableComponent,
    CustomTableComponent,
    DataPropertyGetterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
