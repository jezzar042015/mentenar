<template>
    <div class="px-4 py-5 bg-white -mt-5">

        <template v-if="!auth.token">
            <UnauthenticatedProfile />
        </template>

        <div v-else class="mt-6 space-y-1 md:space-y-3">
            <div class="bg-white px-4 py-3 ">
                <div class="text-2xl font-bold md:text-3xl md:text-cyan-700">KHOC Financial Status</div>
                <div class="text-sm">As of {{ currentDate }}</div>
            </div>

            <div class="bg-white space-y-7 p-4 rounded-md">
                <AccountsContributions />
            </div>

            <hr class="mx-4 border-0 border-b-4 border-b-gray-400 mb-4">


            <div class="bg-white space-y-4 md:space-y-6 p-5 rounded-md">
                <div class="md:flex md:justify-between">
                    <div class="text-gray-800 md:font-semibold md:text-xl md:text-cyan-700">KHOC Fund Balance</div>
                    <div class="text-2xl md:pr-10 font-semibold md:text-cyan-700">{{
                        accounts.formattedBalance }}
                    </div>
                </div>

                <AccountsUtilityExpenses :class="[{ 'md:hidden': accounts.monthlyExpensesBalance === 0 }]" />
                <AccountsReimbursements v-if="accounts.forReimbursementsBalance > 0" />
                <AccountsApprovedExpenses v-if="accounts.approvedExpensesBalance > 0" />

                <div>
                    <hr class="border-0 border-b-2 border-b-gray-400 mb-2">
                    <div class="md:flex md:justify-between">
                        <div
                            :class="['text-gray-800 md:font-semibold md:text-2xl', accounts.fundsAvailable < 0 ? 'md:text-rose-600' : 'md:text-cyan-700']">
                            {{ fundsLeftLabel }}</div>
                        <div
                            :class="['text-3xl font-semibold md:pr-10', accounts.fundsAvailable < 0 ? 'text-rose-600' : 'text-cyan-700']">
                            {{ accounts.formattedFundsAvailable }}</div>
                    </div>
                    <hr class="border-0 border-b-2 border-b-gray-400 mt-2">
                    <hr class="border-0 border-b-4 border-b-gray-400 mt-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AccountsApprovedExpenses from '@/components/AccountsApprovedExpenses.vue';
    import AccountsContributions from '@/components/AccountsContributions.vue';
    import AccountsReimbursements from '@/components/AccountsReimbursements.vue';
    import AccountsUtilityExpenses from '@/components/AccountsUtilityExpenses.vue';
    import UnauthenticatedProfile from '@/components/UnauthenticatedProfile.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';
    import { computed, onMounted } from 'vue';

    const view = useViewsStore()
    const auth = useAuthStore()
    const accounts = useAccountsStore()

    const fundsLeftLabel = computed(() => {
        return accounts.fundsAvailable >= 0 ? 'Available Funds Balance' : 'Funds Dificit'
    })

    const currentDate = computed(() => {
        const d = new Date()
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })

    onMounted(() => {
        view.showHeader = true
    })
</script>