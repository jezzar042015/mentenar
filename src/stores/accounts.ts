import type { AccountsResponse, ApprovedExpense, MonthlyContribution, MonthlyExpense, Reimbursement } from "@/types/accounts";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAuthStore } from "./auth";

export const useAccountsStore = defineStore('accounts', () => {
    const reimbursements = useStorage<Reimbursement[]>('khoc-reimbursements', [], localStorage, { mergeDefaults: true })
    const monthly = useStorage<MonthlyExpense[]>('khoc-monthly-expenses', [], localStorage, { mergeDefaults: true })
    const approved = useStorage<ApprovedExpense[]>('khoc-approved-expenses', [], localStorage, { mergeDefaults: true })
    const contributions = useStorage<MonthlyContribution[]>('khoc-contributions', [], localStorage, { mergeDefaults: true })
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

    const forReimbursementsItems = computed(() => {
        return reimbursements.value.filter(r => r.status == 'For Reimbursement')
    })

    const forReimbursementsBalance = computed(() => {
        return forReimbursementsItems.value.reduce((acc, item) => {
            return acc + (Number(item?.amount) || 0);
        }, 0);
    })

    const monthlyExpensesBalance = computed(() => {
        return monthly.value.filter(f=> f.status === 'Unused').reduce((acc, item) => {
            return acc + (Number(item?.amount) || 0);
        }, 0);
    })

    const approvedExpensesBalance = computed(() => {
        return approved.value.reduce((acc, item) => {
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

    const pull = async () => {

        const url = 'https://script.google.com/macros/s/AKfycbyAQefUYAyineiBgfRWYLrXPl0wDiulgUirIeL5g7tuKuTHgnVlfPd9D47Z9n7dFy8Lvw/exec'

        try {
            fetching.value = true
            const response = await fetch(`${url}?token=${auth.token}`)
            const result = await response.json() as AccountsResponse
            reimbursements.value = result.data?.reimbursements ?? []
            monthly.value = result.data?.monthly ?? []
            approved.value = result.data?.approved ?? []
            contributions.value = result.data?.contributions ?? []
            balance.value = result.data?.balance ?? 0
            latestUpdate.value = result.timestamp
            fetching.value = false

        } catch (error) {
            console.log(error);
            fetching.value = false
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
        pull,
        shouldPull,
        formattedBalance,
        forReimbursementsItems,
        forReimbursementsBalance,
        formattedReimbursementsBalance,
        fundsAvailable,
        formattedFundsAvailable,
        formattedMonthlyExpensesBalance,
        formattedApprovedExpensesBalance
    }
})