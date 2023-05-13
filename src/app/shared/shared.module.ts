import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SimpleTableComponent } from './simple-table/simple-table.component';



@NgModule({
  exports:[
    GenericTableComponent,
    SimpleTableComponent,
  ],
  declarations: [
    GenericTableComponent,
    SimpleTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
