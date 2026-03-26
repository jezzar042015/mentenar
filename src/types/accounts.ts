export interface AccountsResponse {
    status: number
    message: string
    timestamp: string
    data?: {
        reimbursements: Reimbursement[]
        balance: number
        monthly: MonthlyExpense[]
        approved: ApprovedExpense[]
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