export interface AccountsResponse {
    status: number
    message: string
    timestamp: string
    data?: {
        reimbursements: Reimbursement[]
        balance: number
        monthly: MonthlyExpense[]
        approved: ApprovedExpense[]
        contributions: MonthlyContribution[]
    }
}

export interface Reimbursement {
    date: string
    name: string
    desc: string
    status: string
    amount: number
    gcash: string
}

export interface MonthlyExpense {
    name: string
    type: string
    status: string
    amount: number
}

export interface ApprovedExpense {
    date: string
    name: string
    desc: string
    status: string
    amount: number
}

export interface MonthlyContribution {
    cong: string
    resolved: string
    delayed: number
    amount: number
}