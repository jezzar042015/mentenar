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
    status: 'Unused' | 'Used'
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

export interface Transaction {
    date: string
    payee: string
    desc: string
    flow: "IN" | "OUT"
    amount: number
    balance: number
    category: string
}

export interface PostResponse {
    status: '202' | '204'
    message: string
}

export interface PostContributionPayload {
    token: string
    target: 'set-contribution-delay'
    data: {
        cong: string
        months: number
    }
}

export interface PostMonthlyExpensePayload {
    token: string
    target: 'set-monthly-expense-status'
    data: {
        name: string //name of the expense
        status: 'Used' | 'Unused'
    }
}

export interface PostCreateApprovedExpensePayload {
    token: string
    target: 'create-approved-expense'
    data: {
        date: string // in ISO
        name: string
        desc: string
        status: 'For Approval' | 'Approved' | 'For Reimbursement'
        amount: number
    }
}

export interface PostUpdateApprovedExpensePayload {
    token: string
    target: 'update-approved-expense'
    data: {
        row: number
        date: string // in ISO
        name: string
        desc: string
        status: 'For Approval' | 'Approved' | 'For Reimbursement'
        amount: number
    }
}
