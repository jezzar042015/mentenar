<template>
    <div>

        <!-- mobile screens -->
        <div class="text-gray-800 md:font-semibold md:hidden">Unpaid Utility Expenses</div>
        <div @click="gotoUnpaidUtilityExpenses" class="flex justify-between md:hidden">
            <span class="text-2xl font-semibold">
                {{ accounts.formattedMonthlyExpensesBalance }}
            </span>
            <span>
                <CaretLeftIcon class="h-10 w-10 rotate-180" />
            </span>
        </div>

        <!-- larger screens -->
        <div class="hidden md:block">
            <div class="flex justify-between">
                <div class="font-semibold text-xl text-cyan-700">Unpaid Utility Expenses</div>
                <div class="text-2xl font-semibold w-1/3 text-right px-10 text-cyan-700">
                   &dash; {{ accounts.formattedMonthlyExpensesBalance }}
                </div>
            </div>

            <div class="flex">
                <div class="w-2/3 bg-white px-5">
                    <template v-for="m in accounts.monthly" :key="m.name">
                        <MonthlyExpenseItem :m />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import MonthlyExpenseItem from './MonthlyExpenseItem.vue';

    const view = useViewsStore()
    const accounts = useAccountsStore()

    const gotoUnpaidUtilityExpenses = () => {
        view.setView('monthly-expenses')
    }
</script>