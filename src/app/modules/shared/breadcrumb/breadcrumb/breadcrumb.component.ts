import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription, share } from 'rxjs';
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  subscription1: Subscription;
  subscription2: Subscription;


  items: Breadcrumb[] = null;
  home:Breadcrumb ;

  constructor(public breadcrumbService: BreadcrumbService, private router: Router) {
      this.subscription1 = breadcrumbService.itemsHandler.pipe(share()).subscribe(response => {
          this.items = response;
          console.log(response);
          
      });
      this.subscription2 = breadcrumbService.itemsHandler2.pipe(share()).subscribe(response => {
        this.home = response;
        console.log(response);
        
    });
     
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy() {
      if (this.subscription1) {
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
            console.log(this.subscription1)
            this.breadcrumbService.setItems(null)
            this.subscription1.unsubscribe();
          }})
          
      }
      if (this.subscription2) {
        this.router.events.subscribe((event: Event) => {
          if (event instanceof NavigationEnd) {
            console.log(this.subscription1)
            this.breadcrumbService.setHome(null)
            this.subscription2.unsubscribe();
          }})
          
      }

      
      
  }
}
