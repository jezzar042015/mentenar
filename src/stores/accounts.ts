import type { AccountsResponse, ApprovedExpense, MonthlyContribution, MonthlyExpense, PostContributionPayload, PostMonthlyExpensePayload, PostResponse, Reimbursement, Transaction } from "@/types/accounts";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";

export const useAccountsStore = defineStore('accounts', () => {
    const reimbursements = useStorage<Reimbursement[]>('khoc-reimbursements', [], localStorage, { mergeDefaults: true })
    const monthly = useStorage<MonthlyExpense[]>('khoc-monthly-expenses', [], localStorage, { mergeDefaults: true })
    const approved = useStorage<ApprovedExpense[]>('khoc-approved-expenses', [], localStorage, { mergeDefaults: true })
    const contributions = useStorage<MonthlyContribution[]>('khoc-contributions', [], localStorage, { mergeDefaults: true })
    const transactions = useStorage<Transaction[]>('khoc-transcations', [], localStorage, { mergeDefaults: true })
    const latestUpdate = useStorage<string>('khoc-accounts-latest-update', '', localStorage)
    const fetching = ref(false)
    const balance = useStorage<number>('khoc-accounts-balance', 0, localStorage)
    const auth = useAuthStore()

    const formattedBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(balance.value);
    })

    const branchFundTransactions = computed(() => {
        let runningBalance = 0

        return transactions.value
            .filter(t => t.category === 'Branch Fund')
            .map(t => {
                runningBalance += (t.flow === 'IN' ? t.amount : -t.amount)

                return {
                    ...t,
                    balance: runningBalance
                }
            })
    })

    const branchFundBalance = computed(() => {
        return branchFundTransactions.value
            .reduce((acc, item) => {
                const power = item.flow === 'IN' ? 1 : -1
                return acc + (Number(item.amount) * power)
            }, 0)
    })

    const formattedBranchFundBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(branchFundBalance.value);
    })

    const reversedTransactions = computed(() => {
        return [...transactions.value].reverse()
    });

    const forReimbursementsItems = computed(() => {
        return reimbursements.value.filter(r => r.status == 'For Reimbursement')
    })

    const unreceivedContributions = computed(() => {
        return contributions.value
            .map(c => c.amount * c.delayed)
            .reduce((acc, item) => {
                return acc + (Number(item) || 0);
            }, 0);
    })

    const forReimbursementsBalance = computed(() => {
        return forReimbursementsItems.value.reduce((acc, item) => {
            return acc + (Number(item?.amount) || 0);
        }, 0);
    })

    const monthlyExpensesBalance = computed(() => {
        return monthly.value
            .filter(f => f.status === 'Unused')
            .reduce((acc, item) => {
                const amnt = item?.actual > 0 ? item.actual : item?.amount
                return acc + (Number(amnt) || 0);
            }, 0);
    })

    const approvedExpensesItems = computed(() => {
        return approved.value
            .filter(a => a.status === 'Approved')
    })

    const approvedExpensesBalance = computed(() => {
        return approvedExpensesItems.value
            .reduce((acc, item) => {
                return acc + (Number(item?.amount) || 0);
            }, 0);
    })

    const fundsAvailable = computed(() => {
        return balance.value -
            forReimbursementsBalance.value -
            monthlyExpensesBalance.value -
            approvedExpensesBalance.value
    })

    const formattedReimbursementsBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(forReimbursementsBalance.value);
    })

    const formattedMonthlyExpensesBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(monthlyExpensesBalance.value);
    })

    const formattedApprovedExpensesBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(approvedExpensesBalance.value);
    })

    const formattedFundsAvailable = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(fundsAvailable.value);
    })

    const formattedReceivableContributions = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(unreceivedContributions.value);
    })

    const url = 'https://script.google.com/macros/s/AKfycbyAQefUYAyineiBgfRWYLrXPl0wDiulgUirIeL5g7tuKuTHgnVlfPd9D47Z9n7dFy8Lvw/exec'

    const pull = async () => {

        try {
            fetching.value = true
            const response = await fetch(`${url}?token=${auth.token}`)
            const result = await response.json() as AccountsResponse

            // Set the token to falsy state
            if (result.status === 400) auth.token = ''

            reimbursements.value = result.data?.reimbursements ?? []
            monthly.value = result.data?.monthly ?? []
            approved.value = result.data?.approved ?? []
            contributions.value = result.data?.contributions ?? []
            transactions.value = result.data?.transactions ?? []
            balance.value = result.data?.balance ?? 0
            latestUpdate.value = result.timestamp
            fetching.value = false

        } catch (error) {
            console.log(error);
            fetching.value = false
        }
    }

    const setContribution = async (payload: PostContributionPayload) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload)
        });

        const resp = await response.json() as PostResponse;

        if (resp.status.toString() == '202') {
            const contribution = contributions.value.find(c => c.cong === payload.data.cong)
            if (contribution) contribution.delayed = payload.data.months
        }
    }

    const setMonthlyExpenseStatus = async (payload: PostMonthlyExpensePayload) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify(payload)
        });

        const resp = await response.json() as PostResponse;

        if (resp.status.toString() == '202') {
            const monthExpense = monthly.value.find(c => c.name === payload.data.name)
            if (monthExpense) monthExpense.status = payload.data.status
        }
    }

    const shouldPull = computed(() => {
        if (!latestUpdate.value) return true;
        const lastUpdateDate = new Date(latestUpdate.value);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff > 24;
    })

    return {
        reimbursements,
        latestUpdate,
        fetching,
        balance,
        monthly,
        approved,
        contributions,
        transactions,
        pull,
        setContribution,
        setMonthlyExpenseStatus,
        shouldPull,
        formattedBalance,
        approvedExpensesItems,
        approvedExpensesBalance,
        forReimbursementsItems,
        forReimbursementsBalance,
        formattedReimbursementsBalance,
        fundsAvailable,
        formattedFundsAvailable,
        monthlyExpensesBalance,
        formattedMonthlyExpensesBalance,
        formattedApprovedExpensesBalance,
        unreceivedContributions,
        formattedReceivableContributions,
        reversedTransactions,
        branchFundTransactions,
        branchFundBalance,
        formattedBranchFundBalance,
    }
})