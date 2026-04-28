<template>
    <!-- mobile screens -->
    <div class="md:hidden shadow-md rounded-md p-4 bg-white space-y-5">
        <div>
            <div class="text-xs text-gray-600">Payee</div>
            <div class="text-2xl">{{ r.name }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-600">{{isGCash ? 'GCash' : 'Bank'}} Account</div>
            <div v-if="isGCash">{{ r.gcash }}</div>
            <div v-else v-html="bankDetails"></div>

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

    <!-- larger screens -->
    <div class="hidden md:block">
        <div class="flex justify-between items-center border-0 border-b border-b-gray-300 py-1">
            <div class="text-sm">{{ r.desc }}</div>
            <div class="font-semibold">{{ formattedAmount }}</div>
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

    const isGCash = computed(() => {
        return !Number.isNaN(Number(r.gcash.replaceAll(' ', '')))
    })

    const bankDetails = computed(()=> {
        if (isGCash.value) return ''
        return  r.gcash.replaceAll('\n', '<br>')
    })
</script>
