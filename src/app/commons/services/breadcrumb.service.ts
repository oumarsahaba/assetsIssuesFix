import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Breadcrumb } from '../interfaces/breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private itemsSource = new BehaviorSubject<Breadcrumb[]>(null);
  private homeSource= new BehaviorSubject<Breadcrumb>(null);

    itemsHandler = this.itemsSource.asObservable();
    itemsHandler2 = this.homeSource.asObservable();

    


    setItems(items: Breadcrumb[]) {
      console.log(items);
        this.itemsSource.next(items);
    };

    setHome(home: Breadcrumb){
      console.log(home);
      
      this.homeSource.next(home);
    }

}
