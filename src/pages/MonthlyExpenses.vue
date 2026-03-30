<template>
    <div class="p-6">
        <Teleport :to="'body'">
            <MonthlyExpenseStatusForm :target @unset-target="target = null"/>
        </Teleport>
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
                <div class="space-y-2">
                    <template v-for="m in account.monthly" :key="m.name">
                        <MonthlyExpenseItem :m @click="target = m" />
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
    import MonthlyExpenseStatusForm from '@/components/modals/MonthlyExpenseStatusForm.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import type { MonthlyExpense } from '@/types/accounts';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted, ref } from 'vue';

    const view = useViewsStore()
    const account = useAccountsStore()
    const target = ref<MonthlyExpense | null>(null)

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }
    onMounted(() => {
        view.showHeader = false
    })
</script>
