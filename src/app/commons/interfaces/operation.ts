export interface Operation {
    token: string
    type: string
    amount: number
    balanceBefore: number
    balanceAfter: number
    createdAt: Date
}
