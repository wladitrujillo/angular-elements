import { DataSource } from "@angular/cdk/collections";
import { Todo } from "./todo";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Page } from "./page";
import { BehaviorSubject, catchError, finalize, of } from "rxjs";

export class TodosDataSource implements DataSource<Todo> {
    private subject = new BehaviorSubject<Todo[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private totalRowSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalRows$ = this.totalRowSubject.asObservable();


    constructor(private http: HttpClient) { }


    loadData(
        page: number,
        limit: number) {

        this.loadingSubject.next(true);

        this.http.get<Page<Todo>>(`${environment.api}/todos?skip=${page*limit}&limit=${limit}`)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((page: any) => {
                this.totalRowSubject.next(page.total)
                this.subject.next(page.todos);

            });
    }

  
    removeData(index: number) {
        const data = this.subject.value;
        data.splice(index, 1);
        this.subject.next(data);
    }

    connect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): import("rxjs").Observable<any[] | readonly any[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }



    disconnect(collectionViewer: import("@angular/cdk/collections").CollectionViewer): void {
        this.subject.complete();
        this.totalRowSubject.complete();
        this.loadingSubject.complete();
    }
}
