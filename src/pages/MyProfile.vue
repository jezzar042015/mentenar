<template>
    <div class="px-4 ">

        <!-- If not authenticated -->
        <div v-if="!auth.token" class="mt-15 flex flex-col h-full items-center justify-center ">
            <div class="flex space-x-1 items-center justify-center">
                <span>Hello! </span>
                <h2 class="font-bold ">
                    Kingdom Hall User
                </h2>
            </div>

            <div class="mt-10 flex justify-center ">
                <button @click="initSignin" class="shadow-lg rounded-md py-3 px-5 bg-blue-500 text-white">
                    Sign in as KHOC Member
                </button>
            </div>
        </div>

        <div v-else class="mt-6 space-y-5">

            <div class="bg-white shadow-md space-y-7 p-4 rounded-md">
                <div>
                    <div class="text-gray-800">Pending Contributions</div>
                    <div class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedReceivableContributions }}
                        </span>
                        <span @click="gotoContributions">
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>
            </div>

            <div class="bg-white shadow-md space-y-6 p-5 rounded-md">
                <div>
                    <div class="text-gray-800">KHOC Fund Balance</div>
                    <div class="text-2xl font-bold">{{ accounts.formattedBalance }}</div>
                </div>

                <div>
                    <div class="text-gray-800">For Reimbursements</div>
                    <div class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedReimbursementsBalance }}
                        </span>
                        <span @click="gotoReimbursements">
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>

                <div>
                    <div class="text-gray-800">Unpaid Utility Expenses</div>
                    <div class="flex justify-between">
                        <span class="text-2xl font-bold">
                            {{ accounts.formattedMonthlyExpensesBalance }}
                        </span>
                        <span>
                            <CaretLeftIcon class="h-10 w-10 rotate-180" />
                        </span>
                    </div>
                </div>

                <div>
                    <div class="text-gray-800">Approved Future Expenses</div>
                    <div class="flex justify-between">
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

                    <div class="text-gray-800">Available Funds Balance</div>
                    <div class="text-3xl font-bold">{{ accounts.formattedFundsAvailable }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const view = useViewsStore()
    const auth = useAuthStore()
    const accounts = useAccountsStore()

    const initSignin = () => {
        view.setView('signin')
    }

    const gotoReimbursements = () => {
        view.showHeader = false
        view.setView('reimbursements')
    }

    const gotoContributions = () => {
        view.setView('contributions')
    }

    onMounted(() => {
        view.showHeader = true
    })
</script>