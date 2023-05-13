import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodosDataSource } from './todos-data-source';
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Sort } from '@angular/material/sort';
import { Order } from './order';

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
      label: "ID"
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

  dataSource: TodosDataSource;

  orders: Order[];
  ordersTableColumns: { name: string;
    dataKey: string;
    position?: 'right' | 'left';
    isSortable?: boolean;}[] = [];

  constructor(private http: HttpClient,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe) {
    this.dataSource = new TodosDataSource(http);
    this.orders = this.getOrders();
  }


  ngOnInit(): void {

    this.dataSource.load(0, 5);
    this.initializeColumns();


  };


  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    if (sortParameters.direction === 'asc') {
      //this.orders = this.orders.sort((a: Order, b: Order) => a[keyName].localeCompare(b[keyName]));
    } else if (sortParameters.direction === 'desc') {
      //this.orders = this.orders.sort((a: Order, b: Order) => b[keyName].localeCompare(a[keyName]));
    } else {
      this.orders = this.getOrders();
    }
  }

  removeOrder(order: Order) {
    this.orders = this.orders.filter(item => item.id !== order.id);
  }

  initializeColumns(): void {
    this.ordersTableColumns = [
      {
        name: 'book name',
        dataKey: 'description',
        position: 'left',
        isSortable: true
      },
      {
        name: 'ordered amount',
        dataKey: 'amount',
        position: 'right',
        isSortable: false
      },
      {
        name: 'book price',
        dataKey: 'price',
        position: 'right',
        isSortable: true
      },
      {
        name: 'book discount',
        dataKey: 'discount',
        position: 'right',
        isSortable: false
      },
    ];
  }

  getOrders(): any[] {
    return [
      {
        id: 1,
        description: 'first book',
        amount: this.decimalPipe.transform(2, '.1'),
        price: this.currencyPipe.transform(15),
        discount: this.percentPipe.transform(0, '.2')
      },
      {
        id: 2,
        description: 'second book',
        amount: this.decimalPipe.transform(1, '.1'),
        price: this.currencyPipe.transform(42.5),
        discount: this.percentPipe.transform(0.1, '.2')
      },
      {
        id: 3,
        description: 'third book',
        amount: this.decimalPipe.transform(4, '.1'),
        price: this.currencyPipe.transform(12.99),
        discount: this.percentPipe.transform(0.05, '.2')
      },
      {
        id: 4,
        description: 'fourth book',
        amount: this.decimalPipe.transform(1, '.1'),
        price: this.currencyPipe.transform(19.99),
        discount: this.percentPipe.transform(0.02, '.2')
      },
      {
        id: 5,
        description: 'fifth book',
        amount: this.decimalPipe.transform(8),
        price: this.currencyPipe.transform(10.25),
        discount: this.percentPipe.transform(0.2, '.2')
      }
    ];
  }


}
