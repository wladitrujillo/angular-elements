import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodosDataSource } from './todos-data-source';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { Order } from './order';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-elements';


  todosSchema = [
    {
      key: 'id',
      type: 'number',
      label: "ID",
      isSortable: true
    },
    {
      key: 'todo',
      type: 'string',
      label: "Description"
    },
    {
      key: 'completed',
      type: 'boolean',
      label: "Completed"
    },
    {
      key: 'userId',
      type: 'number',
      label: "User ID"
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: ""
    },
  ]

  todosDataSource: TodosDataSource;

  constructor(private http: HttpClient,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe) {
    this.todosDataSource = new TodosDataSource(http);
  }


  ngOnInit(): void {

    this.todosDataSource.loadData(0, 5);


  };


  sortData(sortParameters: Sort) {
    const keyName: string = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      console.log("sorting asc by:", keyName)
    } else if (sortParameters.direction === 'desc') {
      console.log("sorting desc by:", keyName)
    } else {
      console.log("unsorted")
    }
  }

  rowSelection(row: Todo) {
    console.log("Row selection:", row)
  }

  rowDeleting(row: Todo) {
    console.log("Row deleting:", row)
  }
}
