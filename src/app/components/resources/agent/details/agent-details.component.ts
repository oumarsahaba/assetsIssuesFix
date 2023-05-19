import { Component } from '@angular/core';
import {Operation} from "../../../../commons/interfaces/operation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-agent',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent {
    codeAgent: string | null
    accountSlug: string | null
    operations: Operation[]

    constructor(private route: ActivatedRoute) {
        this.codeAgent = null
        this.accountSlug = null
        this.operations = []
    }

    ngOnInit(): void {
        this.codeAgent = this.route.snapshot.paramMap.get('codeAgent')
        this.accountSlug = this.route.snapshot.paramMap.get('accountSlug')
    }

}
