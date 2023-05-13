import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { DataPropertyGetterPipe } from './custom-table/data-property-getter.pipe';
import { SimpleTableComponent } from './simple-table/simple-table.component';



@NgModule({
  exports:[
    GenericTableComponent,
    CustomTableComponent,
    SimpleTableComponent
  ],
  declarations: [
    GenericTableComponent,
    CustomTableComponent,
    DataPropertyGetterPipe,
    SimpleTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
