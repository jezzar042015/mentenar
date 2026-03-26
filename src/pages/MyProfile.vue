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
            <div class="mt-20 flex justify-center ">
                <button @click="initSignin" class="shadow-lg rounded-md py-3 px-5 bg-blue-500 text-white">
                    Sign in as KHOC Member
                </button>
            </div>
        </div>

        <div v-else class="mt-15 px-4 space-y-9">
            <div>
                <div class="text-gray-800">KHOC Fund Balance</div>
                <div class="text-3xl font-bold">{{ accounts.formattedBalance }}</div>
            </div>

            <div>
                <div class="text-gray-800">For Reimbursements</div>
                <div class="flex justify-between">
                    <span class="text-3xl font-bold">
                        {{ accounts.formattedReimbursementsBalance }}
                    </span>
                    <span @click="gotoReimbursements">
                        <CaretLeftIcon class="h-10 w-10 rotate-180" />
                    </span>
                </div>
            </div>

            <div>
                <div class="text-gray-800">Estimated Utility Expenses</div>
                <div class="flex justify-between">
                    <span class="text-3xl font-bold">
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
                    <span class="text-3xl font-bold">
                        {{ accounts.formattedApprovedExpensesBalance }}
                    </span>
                    <span>
                        <CaretLeftIcon class="h-10 w-10 rotate-180" />
                    </span>
                </div>
            </div>

            <hr>
            <div>
                <div class="text-gray-800">Available Funds Balance</div>
                <div class="text-4xl font-bold">{{ accounts.formattedFundsAvailable }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';

    const view = useViewsStore()
    const auth = useAuthStore()
    const accounts = useAccountsStore()

    const initSignin = () => {
        view.setView('signin')
        view.showHeader = false
    }

    const gotoReimbursements = () => {
        view.showHeader = false
        view.setView('reimbursements')
    }
</script>