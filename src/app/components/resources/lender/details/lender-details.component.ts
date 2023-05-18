import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OperationService} from "../../../../services/operation.service";
import {Lender} from "../../../../commons/interfaces/lender";
import {BaseLender} from "../../../../commons/models/lender";
import {AppError} from "../../../../commons/errors/app-error";
import {NotFoundError} from "../../../../commons/errors/not-found-error";
import {Operation} from "../../../../commons/interfaces/operation";
import {BaseOperation} from "../../../../commons/models/operation";

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
