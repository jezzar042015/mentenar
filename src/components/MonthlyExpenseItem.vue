<template>
    <div class="border-0 border-b border-b-gray-300 py-4">
        <div class="flex justify-between">
            <div class="text-lg font-semibold">{{ m.name }}</div>
            <div :class="['text-xl font-semibold', {'text-gray-300': amount == 0}]">{{ formattedAmount }}</div>
        </div>
        <!-- <div>{{ m.status }}</div> -->
        <div class="text-sm">{{ m.type }}</div>

    </div>
</template>

<script setup lang="ts">
    import type { MonthlyExpense } from '@/types/accounts';
    import { computed } from 'vue';

    const { m } = defineProps<{
        m: MonthlyExpense
    }>()

    const amount = computed(() => {
        return m.amount * (m.status == 'Used' ? 0 : 1)
    })

    const formattedAmount = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(amount.value);
    })
</script>
