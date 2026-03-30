<template>
    <div v-if="target" class="absolute w-full h-screen bg-black/60 flex z-30 top-0 left-0 items-center justify-center">
        <div class="bg-white p-5 rounded-md w-full m-6">
            <div class="text-sm uppercase mb-10">Update Expense Utilization</div>

            <div class="space-y-5 mb-5">
                <div>
                    <div class="text-sm text-gray-700">Expense</div>
                    <div class="text-lg font-semibold">{{ target.name }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Type</div>
                    <div class="text-lg font-semibold">{{ target.type }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Utilization Status</div>

                    <select name="" id="" v-model="utilizationStatus"
                        class="py-2 px-0 text-lg font-semibold border-0 border-b border-b-gray-400 w-full outline-0">
                        <option :value="'Used'">Utilized</option>
                        <option :value="'Unused'">Unutilized</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-3 justify-between mt-15">
                <button @click="post"
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white">Update</button>
                <button @click="unsetTarget" class="py-2 shadow rounded-md cursor-pointer w-1/2">Close</button>
            </div>
        </div>
    </div>
    <div v-if="posting" class="z-30 absolute top-0 left-0 w-full h-screen bg-white/90 flex items-center justify-center">
        <FetchingSpinner />
    </div>
</template>

<script setup lang="ts">
    import type { MonthlyExpense } from '@/types/accounts';
    import FetchingSpinner from '../FetchingSpinner.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { ref, watch } from 'vue';

    const { target } = defineProps<{
        target: MonthlyExpense | null
    }>()

    const accounts = useAccountsStore()
    const auth = useAuthStore()

    const utilizationStatus = ref<'Unused' | 'Used'>('Unused')
    const posting = ref(false)

    const emits = defineEmits(['unset-target'])

    const unsetTarget = () => {
        emits('unset-target')
    }

    const post = async () => {
        if (!target) return
        posting.value = true

        await accounts.setMonthlyExpenseStatus({
            target: 'set-monthly-expense-status',
            token: auth.token,
            data: {
                name: target.name,
                status: utilizationStatus.value
            }
        })

        unsetTarget()
        posting.value = false
    }

    watch(() => target, (val) => {
        if (!val) return
        utilizationStatus.value = val.status
    }, { immediate: true })
</script>