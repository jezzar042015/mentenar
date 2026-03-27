<template>
    <div class="border-0 border-b border-b-gray-300 py-3 space-y-4">
        <div>
            <div class="text-xs text-gray-500">Request Date</div>
            <div>{{ dateDisplay }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-500">Requested By</div>
            <div>{{ a.name }}</div>
        </div>

        <div class="">
            <div class="text-xs text-gray-500">Description</div>
            <div>{{ a.desc }}</div>
        </div>

        <div>
            <div class="text-xs text-gray-500">Amount</div>
            <div class="text-lg font-semibold">{{ formattedAmount }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ApprovedExpense } from '@/types/accounts';
    import { computed } from 'vue';

    const { a } = defineProps<{
        a: ApprovedExpense
    }>()

    const formattedAmount = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(a.amount);
    })

    const dateDisplay = computed(() => {
        const d = new Date(a.date)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })
</script>
