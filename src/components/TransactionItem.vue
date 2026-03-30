<template>
    <div class="mx-1 px-2 text-sm py-1 space-y-0.5 odd:bg-gray-200">
        <div class="grid grid-cols-3 gap-1">
            <div class="">{{ dateDisplay }}</div>
            <div class="text-right relative">
                {{ formattedAmount }}
                <span class="absolute top-0.5">
                    <ArrowIcon :class="['h-4 w-4', t.flow == 'IN' ? 'text-lime-600 rotate-180' : 'text-red-700']" />
                </span>
            </div>
            <div class="text-right">{{ formattedBalance }}</div>
        </div>
        <div class="text-gray-500">{{ t.payee }}</div>
    </div>
</template>

<script setup lang="ts">
    import ArrowIcon from '@/icons/ArrowIcon.vue';
    import type { Transaction } from '@/types/accounts';
    import { computed } from 'vue';

    const { t } = defineProps<{
        t: Transaction
    }>()

    const dateDisplay = computed(() => {
        const date = new Date(t.date)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    })

    const formattedAmount = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(t.amount);
    })

    const formattedBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(t.balance)
    })


</script>