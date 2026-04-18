<template>
    <div v-if="target" @click.self="unsetTarget"
        class="absolute bg-black/60 w-full h-screen top-0 left-0 flex justify-center items-center">
        <div class="p-6 flex flex-col bg-white w-full mx-3 max-w-md rounded-md">
            <div class="flex justify-between items-center">
                <div class="text-sm uppercase mb-6">Transaction Details</div>
                <div class="-mt-5">
                    <ArrowIcon
                        :class="['h-10 w-10', target.flow == 'IN' ? 'text-lime-600 rotate-180' : 'text-red-700']" />
                </div>
            </div>
            <div class="space-y-5">
                <div>
                    <div class="text-sm text-gray-700">Date</div>
                    <div class="text-lg font-semibold">{{ dateDisplay }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Payee</div>
                    <div class="text-lg font-semibold">{{ target.payee }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Description</div>
                    <div class="text-lg font-semibold">{{ target.desc }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Category</div>
                    <div class="text-lg font-semibold">{{ target.category }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Amount</div>
                    <div class="text-lg font-semibold">{{ formattedAmount }}</div>
                </div>

                <div v-if="target.remarks">
                    <div class="text-sm text-gray-700">Additional Details</div>
                    <div class="text-lg font-semibold">{{ target.remarks }}</div>
                </div>

            </div>
            <div class="flex gap-3 mt-15">
                <button @click="unsetTarget" class="py-2 shadow rounded-md cursor-pointer px-10 bg-gray-200">OK</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ArrowIcon from '@/icons/ArrowIcon.vue';
    import type { Transaction } from '@/types/accounts';
    import { computed } from 'vue';

    const { target } = defineProps<{
        target?: Transaction | null
    }>()

    const emits = defineEmits(['unset-target'])
    const unsetTarget = () => {
        emits('unset-target')
    }

    const dateDisplay = computed(() => {
        if (!target) return null
        const date = new Date(target.date)
        return date.toLocaleString('en-US', {
            'month': 'long',
            'day': 'numeric',
            'year': 'numeric',
        })
    })

    const formattedAmount = computed(() => {
        return Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(target?.amount ?? 0)
    })
</script>