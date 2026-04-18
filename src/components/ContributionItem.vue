<template>
    <div class="py-1 border-0 border-b border-b-gray-300 md:border-b-gray-200 md:py-1">
        <!-- mobile screens -->
        <div class="flex justify-between md:hidden cursor-pointer hover:bg-white p-3 hover:shadow rounded-sm">
            <div>
                <div class="text-lg font-semibold">
                    {{ cong.cong }}
                </div>
                <div class="text-xs">
                    {{ delayedMonths || 'No delay' }}
                </div>
            </div>
            <div :class="['text-xl font-semibold', { 'text-gray-300': payable == 0 }]">{{ formattedPayable }}</div>
        </div>

        <!-- big screens -->
        <div class="hidden md:grid grid-cols-3 justify-between items-center">
            <div class="text-sm">{{ cong.cong }}</div>
            <div class="text-sm">{{ delayedMonths || '-' }}</div>
            <div :class="['font-semibold text-right', { 'text-gray-300': payable == 0 }]">{{ formattedPayable }}</div>
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

    const delayedMonths = computed(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const currentMonthIndex = new Date().getMonth(); // 0-indexed (Jan is 0)
        let selectedMonths = [];

        for (let i = 0; i < cong.delayed; i++) {
            // Calculate index and handle negative wrap-around using modulo
            let targetIndex = (currentMonthIndex - i) % 12;
            if (targetIndex < 0) targetIndex += 12;

            selectedMonths.unshift(monthNames[targetIndex]);
        }

        // Formatting: handle the " & " for the last item and commas for the rest
        if (selectedMonths.length <= 1) return selectedMonths.join("");

        const lastMonth = selectedMonths.pop();
        return `${selectedMonths.join(", ")} & ${lastMonth}`;
    })
</script>
