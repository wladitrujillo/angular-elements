
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, AfterViewInit {

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() columnsSchema: {
    label: string;
    key: string;
    type: string;
    isSortable?: boolean;
  }[] = [];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() dataSource: any;

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDeleting: EventEmitter<any> = new EventEmitter<any>();
  @Output() pagination: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: false }) matPaginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort!: MatSort;


  displayedColumns: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsSchema.map((tableColumn) => tableColumn.key);
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    merge(this.matPaginator?.page)
      .pipe(
        tap(() => this.pagination.emit(
          {
            page: this.matPaginator.pageIndex,
            size: this.matPaginator.pageSize
          })
        )
      )
      .subscribe();

  }

  loadPage() {
    this.dataSource.loadData(
      this.matPaginator?.pageIndex,
      this.matPaginator?.pageSize);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    sortParameters.active = this.columnsSchema.find(column => column.key === sortParameters.active)?.key || '';
    this.sort.emit(sortParameters);
  }

  emitRowSelection(row: any) {
    this.rowSelection.emit(row);
  }

  emitRowDeleting(row: any) {
    this.rowDeleting.emit(row);
  }
}
