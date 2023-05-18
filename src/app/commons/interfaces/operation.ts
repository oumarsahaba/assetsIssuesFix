export interface Operation {
    token: string
    type: string
    amount: number
    fees: number
    balanceBefore: number
    balanceAfter: number
    createdAt: Date
}
