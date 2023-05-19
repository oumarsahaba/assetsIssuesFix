import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../../../commons/interfaces/operation";

@Component({
  selector: 'app-details',
  templateUrl: './lender-details.component.html',
  styleUrls: ['./lender-details.component.css']
})
export class LenderDetailsComponent implements OnInit {

    codeLender: string | null
    accountSlug: string | null
    operations: Operation[]

    constructor(private route: ActivatedRoute) {
        this.codeLender = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.codeLender = this.route.snapshot.paramMap.get('codeLender')
        this.accountSlug = this.route.snapshot.paramMap.get('accountSlug')
    }

}
