import { Component } from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-aggregator',
  templateUrl: './aggregator-details.component.html',
  styleUrls: ['./aggregator-details.component.css']
})
export class AggregatorDetailsComponent {
    codeAggregator: string | null
    accountSlug: string | null
    operations: Operation[]

    constructor(private route: ActivatedRoute) {
        this.codeAggregator = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.codeAggregator = this.route.snapshot.paramMap.get('codeAggregator')
        this.accountSlug = this.route.snapshot.paramMap.get('accountSlug')
    }


}
