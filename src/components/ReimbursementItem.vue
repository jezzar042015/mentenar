<template>
    <div class="shadow-md rounded-md p-4 bg-white space-y-5">
        <div>
            <div class="text-xs text-gray-600">Payee</div>
            <div class="text-2xl">{{ r.name }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-600">GCash Account</div>
            <div>{{ r.gcash }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-600">Description</div>
            <div>{{ r.desc }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-600">Amount</div>
            <div class="text-2xl font-bold">{{ formattedAmount }}</div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { Reimbursement } from '@/types/accounts';
    import { computed } from 'vue';

    const { r } = defineProps<{
        r: Reimbursement
    }>()

    const formattedAmount = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(r.amount);
    })
</script>
