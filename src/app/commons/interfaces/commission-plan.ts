export interface CommissionPlan {
    id?: number
    startAmount : number
    endAmount : number
    feesFix : number
    feesPercentage : number
    commissionAggregator : number
    commissionWholesaler : number
    commissionLender:  number
    operationType : string
    resourceType:  string
    resourceCode : string
}
