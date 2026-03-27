<template>
    <div class="py-3 border-0 border-b border-b-gray-300 md:border-b-gray-200 md:py-1">
        <!-- mobile screens -->
        <div class="flex justify-between md:hidden">
            <div>
                <div class="text-lg font-semibold">
                    {{ cong.cong }}
                </div>
                <div class="text-xs">
                    March
                </div>
            </div>
            <div :class="['text-xl font-semibold', {'text-gray-300': payable == 0}]">{{ formattedPayable }}</div>
        </div>

        <!-- big screens -->
         <div class="hidden md:flex justify-between">
            <div>{{ cong.cong }}</div>
            <div :class="['font-semibold', {'text-gray-300': payable == 0}]">{{ formattedPayable }}</div>
         </div>
    </div>
</template>

<script setup lang="ts">
    import type { MonthlyContribution } from '@/types/accounts';
    import { computed } from 'vue';

    const { cong } = defineProps<{
        cong: MonthlyContribution
    }>()

    const payable = computed(() => {
        return cong.delayed * cong.amount
    })

    const formattedPayable = computed(() => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        }).format(payable.value);
    })
</script>
