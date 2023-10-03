import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'src/app/commons/interfaces/breadcrumb';
import { BreadcrumbService } from 'src/app/commons/services/breadcrumb.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent{
    
    showMobileSideBar = false
    
    toggleMobileSideBar() {
        this.showMobileSideBar = !this.showMobileSideBar
    }
}
