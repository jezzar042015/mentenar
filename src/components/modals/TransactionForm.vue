<template>
    <div
        class="absolute bg-black/60 w-full h-screen top-0 left-0 flex justify-center items-center z-20 transition-all duration-500">
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
                    <input type="text" v-model="target.payee" maxlength="8"
                        class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

                <div>
                    <div class="text-sm text-gray-700">Description</div>
                    <input type="text" v-model="target.desc" 
                        class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

                <div>
                    <div class="text-sm text-gray-700">Transaction</div>
                    <select v-model="target.flow" class="border border-gray-400 rounded-md px-2 py-2 w-full">
                        <option v-for="(value, key) in transactionFlow" :value="key">
                            {{ value }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Category</div>
                    <select v-model="target.category" class="border border-gray-400 rounded-md px-2 py-2 w-full">
                        <option v-for="c in categories" :value="c">
                            {{ c }}
                        </option>
                    </select>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Amount</div>
                    <input type="number" v-model="target.amount"
                        class="border border-gray-400 rounded-md px-4 py-2 w-full">
                </div>

            </div>
            <div class="flex gap-3 mt-15">
                <button @click="post"
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white disabled:bg-gray-400"
                    :disabled="!isFormComplete">Create</button>
                <button @click="close" class="py-2 shadow rounded-md cursor-pointer w-1/2">Close</button>
            </div>
        </div>
    </div>
    <div v-if="posting" class="z-30 absolute top-0 left-0 w-full h-screen bg-white/90 flex items-center justify-center">
        <FetchingSpinner />
    </div>
</template>

<script setup lang="ts">
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import type { Transaction } from '@/types/accounts';
    import { computed, ref } from 'vue';
    import FetchingSpinner from '../FetchingSpinner.vue';

    const account = useAccountsStore()
    const auth = useAuthStore()
    const posting = ref(false)
    const transactionFlow = ref<Record<"IN" | "OUT", string>>(
        { IN: "Incoming", OUT: "Outgoing" }
    )

    const categories = ref([
        "Contribution",
        "Operation",
        "Service Charge",
        "Maintenance",
        "Bank Charges",
        "Resource Recovery",
        "Supplies",
        "Branch Fund",
        "Window Blinds",
    ])

    const target = ref<Transaction>({
        date: new Date().toISOString().split("T")[0] || '',
        amount: 0,
        balance: 0,
        category: '',
        desc: '',
        flow: 'IN',
        payee: '',
        remarks: '',
    })

    const emits = defineEmits(['close'])

    const close = () => {
        emits('close')
    }

    const post = async () => {
        if (!isFormComplete.value) return

        posting.value = true

        await account.addBankTransaction({
            token: auth.token,
            target: 'create-primary-transaction',
            data: target.value
        })

        posting.value = false
        close()

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

    const isFormComplete = computed(() => {
        const data = target.value;

        // Set for O(1) lookup performance
        const ignoredKeys = new Set<keyof Transaction>(['balance', 'remarks']);

        // Iterate through keys and validate
        return (Object.keys(data) as Array<keyof Transaction>).every((key) => {
            // Skip if the key is in our ignored set
            if (ignoredKeys.has(key)) return true;

            const value = data[key];

            // Validation logic: Ensure value is not empty, null, or 0
            return (
                value !== '' &&
                value !== null &&
                value !== undefined &&
                value !== 0
            );
        });
    });

    const formattedAmount = computed(() => {
        return Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(target.value.amount ?? 0)
    })
</script>