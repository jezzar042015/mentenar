<template>
    <div class="px-4 ">

        <template v-if="!auth.token">
            <UnauthenticatedProfile />
        </template>

        <div v-else class="mt-6 space-y-5">

            <div class="bg-white shadow-md space-y-7 p-4 rounded-md">
                <div>
                    <div class="text-gray-800">Pending Contributions</div>
                    <!-- mobile screens -->
                    <div @click="gotoContributions" class="flex justify-between cursor-pointer md:hidden">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedReceivableContributions }}
                        </span>
                        <span>
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>

                    <!-- md screens -->
                    <div class="hidden md:flex">
                        <div class="text-3xl font-bold w-1/3">
                            {{ accounts.formattedReceivableContributions }}
                        </div>
                        <div class="w-2/3 bg-white px-10">
                            <template v-for="c in accounts.contributions" :key="c.cong">
                                <ContributionItem :cong="c" />
                            </template>
                        </div>
                    </div>

                </div>
            </div>

            <div class="bg-white shadow-md space-y-6 p-5 rounded-md">
                <div>
                    <div class="text-gray-800">KHOC Fund Balance</div>
                    <div class="text-2xl font-bold">{{ accounts.formattedBalance }}</div>
                </div>

                <div>
                    <div class="text-gray-800">Unpaid Utility Expenses</div>
                    <div @click="gotoUnpaidUtilityExpenses" class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedMonthlyExpensesBalance }}
                        </span>
                        <span>
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>

                <div>
                    <div class="text-gray-800">For Reimbursements</div>
                    <div @click="gotoReimbursements" class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedReimbursementsBalance }}
                        </span>
                        <span>
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>

                <div>
                    <div class="text-gray-800">Approved Future Expenses</div>
                    <div @click="gotoApprovedExpenses" class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedApprovedExpensesBalance }}
                        </span>
                        <span>
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>

                <div>
                    <hr class="border-0 border-b border-b-gray-300 mb-4">

                    <div class="text-gray-800">{{ fundsLeftLabel }}</div>
                    <div class="text-3xl font-bold">{{ accounts.formattedFundsAvailable }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ContributionItem from '@/components/ContributionItem.vue';
    import UnauthenticatedProfile from '@/components/UnauthenticatedProfile.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';
    import { computed, onMounted } from 'vue';

    const view = useViewsStore()
    const auth = useAuthStore()
    const accounts = useAccountsStore()

    const gotoReimbursements = () => {
        view.showHeader = false
        view.setView('reimbursements')
    }

    const gotoContributions = () => {
        view.setView('contributions')
    }

    const gotoUnpaidUtilityExpenses = () => {
        view.setView('monthly-expenses')
    }

    const gotoApprovedExpenses = () => {
        view.setView('approved-expenses')
    }

    const fundsLeftLabel = computed(() => {
        return accounts.fundsAvailable >= 0 ? 'Available Funds Balance' : 'Funds Dificit'
    })

    onMounted(() => {
        view.showHeader = true
    })
</script>