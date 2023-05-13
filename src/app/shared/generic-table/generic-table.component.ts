import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, tap } from 'rxjs';



@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, AfterViewInit {

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
    this.dataSource.load(
      this.matPaginator?.pageIndex,
      this.matPaginator?.pageSize);
  }

  ngOnInit(): void {
    this.displayedColumns = this.columnsSchema?.map((col) => col.key);
  }
}
