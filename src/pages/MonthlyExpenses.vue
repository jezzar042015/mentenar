<template>
    <div class="p-6">
        <div>
            <div @click="exit" class="flex space-x-0 items-center">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="font-bold text-2xl mb-10">
                Unpaid Utility Expenses
            </div>
            <div>
                <div class="space-y-5">
                    <template v-for="m in account.monthly" :key="m.name">
                        <MonthlyExpenseItem :m />
                    </template>

                    <div class="flex justify-between py-3">
                        <div class="w-1/2 font-bold text-lg">Unutilized</div>
                        <div class="text-2xl font-bold">{{ account.formattedMonthlyExpensesBalance }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import MonthlyExpenseItem from '@/components/MonthlyExpenseItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const view = useViewsStore()
    const account = useAccountsStore()

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }
    onMounted(() => {
        view.showHeader = false
    })
</script>
