<template>
    <div>

        <!-- mobile screens -->
        <div class="md:hidden">
            <div class="text-gray-800">Approved Future Expenses</div>
            <div @click="gotoApprovedExpenses" class="flex justify-between">
                <span class="text-2xl font-semibold">
                    {{ accounts.formattedApprovedExpensesBalance }}
                </span>
                <span>
                    <CaretLeftIcon class="h-10 w-10 rotate-180" />
                </span>
            </div>
        </div>

        <!-- larger screens -->
        <div class="hidden md:block">
            <div class="flex justify-between">
                <div class="text-cyan-700 font-semibold text-xl">Approved Future Maintenance Expenses</div>
                <div class="text-2xl font-semibold text-right px-10 text-cyan-700">
                   &dash; {{ accounts.formattedApprovedExpensesBalance }}
                </div>
            </div>

            <div class="w-2/3 bg-white px-5">
                <template v-for="a in accounts.approved" :key="a.date + a.name">
                    <ApprovedExpenseItem :a />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import ApprovedExpenseItem from './ApprovedExpenseItem.vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()
    const gotoApprovedExpenses = () => {
        view.setView('approved-expenses')
    }
</script>