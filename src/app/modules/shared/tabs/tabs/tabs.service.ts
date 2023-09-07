import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  constructor() { }

    activeTab: string = '';

    showOverDraftRequest() {
        this.activeTab = 'overdraftRequest';
    }

    showOperation() {
        this.activeTab = 'operation';
    }

    showOperationCredit() {
        this.activeTab = 'operationCredit';
    }

    showOperationCommission() {
        this.activeTab = 'operationCommission';
    }

    showCommission() {
        this.activeTab = 'commission';
    }

    showProvisionRequest() {
        this.activeTab = 'provision';
    }

    showAccountOperations() {
        this.activeTab = 'accountOperation';
    }

    showCommissionPlan() {
        this.activeTab = 'commissionPlan';
    }

}
