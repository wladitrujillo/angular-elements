import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, tap } from 'rxjs';


@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss']
})
export class SimpleTableComponent {
  @Input() isPageable = false;

  @Input() dataSource: any = {};
  @Input() columnsSchema: { key: string, type: string, label: string }[] = [];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator, { static: false }) matPaginator?: MatPaginator;

  constructor() { }

  ngAfterViewInit(): void {
    merge(this.matPaginator?.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();

  }

  loadPage() {
    this.dataSource.loadData(
      this.matPaginator?.pageIndex,
      this.matPaginator?.pageSize);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsSchema?.map((col) => col.key);
  }
}
