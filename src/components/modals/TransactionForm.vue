<template>
    <div class="absolute bg-black/60 w-full h-screen top-0 left-0 flex justify-center items-center z-20">
        <div class="p-6 flex flex-col bg-white w-full mx-3 rounded-md max-w-2xl">
            <div class="flex justify-between items-center">
                <div class="text-sm uppercase mb-6">New Transaction</div>
            </div>
            <div class="space-y-5">
                <div>
                    <div class="text-sm text-gray-700">Date</div>
                    <input type="date" v-model="target.date" class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

                <div>
                    <div class="text-sm text-gray-700">Payee</div>
                    <input type="text" v-model="target.payee" maxlength="8" class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

                <div>
                    <div class="text-sm text-gray-700">Description</div>
                    <input type="text" v-model="target.desc" maxlength="20" class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

                <div>
                    <div class="text-sm text-gray-700">Category</div>
                    <div class="text-lg font-semibold">{{ target.category }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Amount</div>
                    <input type="number" v-model="target.amount" class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

            </div>
            <div class="flex gap-3 mt-15">
                <button @click="post"
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white">Create</button>
                <button @click="close" class="py-2 shadow rounded-md cursor-pointer w-1/2">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Transaction } from '@/types/accounts';
    import { computed, ref } from 'vue';


    const target = ref<Transaction>({
        date: new Date().toISOString().split("T")[0] || '',
        amount: 0,
        balance: 0,
        category: '',
        desc: '',
        flow: 'IN',
        payee: ''
    })
    const emits = defineEmits(['close'])
    const close = () => {
        emits('close')
    }

    const post = async () => {

    }

    const dateDisplay = computed(() => {
        if (!target) return null
        const date = new Date(target.value.date)
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
        }).format(target.value.amount ?? 0)
    })
</script>