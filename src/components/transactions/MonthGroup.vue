<template>
    <div class="mb-4">
        <!-- Month Header -->
        <div class="px-3 py-1 font-bold bg-gray-100 flex justify-between">
            <span>{{ group.month }}</span>
            <span>{{ formattedBalance }}</span>
        </div>

        <!-- Transactions -->
        <template v-for="t in group.transactions" :key="t.date + t.desc + t.payee + t.flow + t.balance">
            <TransactionItem :t @click="setTarget(t)" />
        </template>
    </div>
</template>

<script setup lang="ts">
    import type { MonthGroupTransaction, Transaction } from '@/types/accounts';
    import TransactionItem from '../TransactionItem.vue';
    import { computed } from 'vue';

    const { group } = defineProps<{
        group: MonthGroupTransaction
    }>()

    const emits = defineEmits([
        'set-target'
    ])

    const formattedBalance = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(group.summary)
    })

    const setTarget = (t: Transaction) => {
        emits('set-target', t)
    }
</script>