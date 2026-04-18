<template>
    <div class="border-0 border-b border-b-gray-300 transition-all duration-500 cursor-pointer">
        <!-- mobile screens -->
        <div class="py-4 px-4 md:hidden hover:bg-orange-100 hover:shadow">
            <div class="flex justify-between rounded-sm ">
                <div class="text-lg font-semibold">{{ m.name }}</div>
                <div :class="['text-xl font-semibold', { 'text-gray-300': amount == 0 }]">{{ formattedAmount }}</div>
            </div>
            <div class="text-sm">{{ m.type }}</div>
        </div>

        <!-- larger screens -->
        <div class="hidden md:grid grid-cols-3 justify-center py-1 px-0">
            <div class="text-sm">{{ m.name }}</div>
            <div class="text-sm">{{ m.type }}</div>
            <div :class="['font-semibold text-right', { 'text-gray-300': amount == 0 }]">
                {{ formattedAmount }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { MonthlyExpense } from '@/types/accounts';
    import { computed } from 'vue';

    const { m } = defineProps<{
        m: MonthlyExpense
    }>()

    const amount = computed(() => {
        const amntToUse = m.actual > 0 ? m.actual : m.amount 
        return amntToUse * (m.status == 'Used' ? 0 : 1)
    })

    const formattedAmount = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(amount.value);
    })
</script>
