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
  ordersTableColumns: {
    label: string;
    key: string;
    position?: 'right' | 'left';
    isSortable?: boolean;
  }[] = [];

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
    const keyName: string = sortParameters.active;
    if (sortParameters.direction === 'asc') {
     // this.orders = this.orders.sort((a: Order, b: Order) => a[keyName as keyof Order]?.localeCompare(b[keyName as keyof Order]));
     console.log("sorting asc by:", keyName)
    } else if (sortParameters.direction === 'desc') {
     // this.orders = this.orders.sort((a: Order, b: Order) => b[keyName as keyof Order]?.localeCompare(a[keyName as keyof Order]));
     console.log("sorting desc by:", keyName)
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
        label: 'book name',
        key: 'description',
        position: 'left',
        isSortable: true
      },
      {
        label: 'ordered amount',
        key: 'amount',
        position: 'right',
        isSortable: false
      },
      {
        label: 'book price',
        key: 'price',
        position: 'right',
        isSortable: true
      },
      {
        label: 'book discount',
        key: 'discount',
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
