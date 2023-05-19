import { Component } from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-wholesaler',
  templateUrl: './wholesaler-details.component.html',
  styleUrls: ['./wholesaler-details.component.css']
})
export class WholesalerDetailsComponent {
    codeWholesaler: string | null
    accountSlug: string | null
    operations: Operation[]

    constructor(private route: ActivatedRoute) {
        this.codeWholesaler = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.codeWholesaler = this.route.snapshot.paramMap.get('codeWholesaler')
        this.accountSlug = this.route.snapshot.paramMap.get('accountSlug')
    }


}
