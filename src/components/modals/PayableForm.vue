<template>
    <div
        class="absolute bg-black/60 w-full h-screen overflow-hidden top-0 left-0 flex justify-center items-center z-20 transition-all duration-500">
        <div class="p-6 flex flex-col bg-white w-full mx-3 rounded-md max-w-2xl">
            <div class="flex justify-between items-center">
                <div class="text-sm uppercase mb-4">New Payable</div>
            </div>
            <div class="space-y-5 max-h-[75vh] overflow-y-auto">
                <div class="space-y-5">

                    <div>
                        <div class="text-sm text-gray-700">Date</div>
                        <input type="date" v-model="target.date"
                            class="appearance-none border border-gray-400 rounded-md px-4 py-2 w-full">
                    </div>

                    <div>
                        <div class="text-sm text-gray-700">Payee</div>
                        <input type="text" v-model="target.name" maxlength="8"
                            class="border border-gray-400 rounded-md px-4 py-2 w-full">
                    </div>

                    <div>
                        <div class="text-sm text-gray-700">Description</div>
                        <input type="text" v-model="target.desc"
                            class="border border-gray-400 rounded-md px-4 py-2 w-full">
                    </div>

                    <div>
                        <div class="text-sm text-gray-700">Amount</div>
                        <input type="number" v-model="target.amount"
                            class="border border-gray-400 rounded-md px-4 py-2 w-full">
                    </div>

                    <div>
                        <div class="text-sm text-gray-700">Payment thru</div>
                        <select v-model="paymentMode"
                            class="appearance-none border border-gray-400 rounded-md px-2 py-2 w-full">
                            <option v-for="key in paymentModes" :key :value="key">
                                {{ key }}
                            </option>
                        </select>
                    </div>

                    <div v-if="paymentMode == 'GCash'">
                        <div class="text-sm text-gray-700">GCash Number</div>
                        <input type="text" v-model="target.gcash"
                            class="border border-gray-400 rounded-md px-4 py-2 w-full">
                    </div>
                    <div v-else class="space-y-5">
                        <div>
                            <div class="text-sm text-gray-700">Bank</div>
                            <input type="text" v-model="bankDetails.bank"
                                class="border border-gray-400 rounded-md px-4 py-2 w-full">

                        </div>
                        <div>
                            <div class="text-sm text-gray-700">Account Name</div>
                            <input type="text" v-model="bankDetails.name"
                                class="border border-gray-400 rounded-md px-4 py-2 w-full">
                        </div>
                        <div>
                            <div class="text-sm text-gray-700">Account Number</div>
                            <input type="text" v-model="bankDetails.num"
                                class="border border-gray-400 rounded-md px-4 py-2 w-full">
                        </div>
                    </div>

                </div>
                <div class="flex gap-3 mt-10">
                    <button @click="post"
                        class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white disabled:bg-gray-400"
                        :disabled="!isFormComplete">Create</button>
                    <button @click="close" class="py-2 shadow rounded-md cursor-pointer w-1/2">Close</button>
                </div>
            </div>

        </div>
    </div>
    <div v-if="posting" class="z-30 absolute top-0 left-0 w-full h-screen bg-white/90 flex items-center justify-center">
        <FetchingSpinner />
    </div>
</template>

<script setup lang="ts">
    import type { Reimbursement } from '@/types/accounts';
    import { computed, ref, watch } from 'vue';

    const posting = ref(false)
    const emits = defineEmits(['close'])

    const target = ref<Reimbursement>({
        date: '',
        name: '',
        desc: '',
        amount: 0,
        gcash: '',
        status: 'For Reimbursement',
    })

    const bankDetails = ref({
        bank: "",
        name: "",
        num: "",
    })

    const paymentModes = ref<string[]>([
        "GCash", "Bank Account"
    ])

    const paymentMode = ref<string>('GCash')

    const isFormComplete = computed(() => {
        const data = target.value;

        // Set for O(1) lookup performance
        const ignoredKeys = new Set<keyof Reimbursement>([]);

        // Iterate through keys and validate
        return (Object.keys(data) as Array<keyof Reimbursement>).every((key) => {
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
    })

    const close = () => {
        emits('close')
    }

    const post = async () => {
        if (!isFormComplete.value) return

        
    }

    watch(
        () => [bankDetails.value, paymentMode.value],
        () => {
            if (bankDetails.value.bank == '' || bankDetails.value.name == '' || bankDetails.value.num == '') {
                target.value.gcash = ""
                return
            }
            target.value.gcash = `${bankDetails.value.bank}\n${bankDetails.value.name}\n${bankDetails.value.num}`
        },
        {
            deep: true
        }
    )
</script>