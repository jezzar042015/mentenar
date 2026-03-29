<template>
    <div v-if="target" class="absolute w-full h-screen bg-black/60 flex z-20 top-0 left-0 items-center justify-center">
        <div class="bg-white p-5 rounded-md w-full m-6">
            <div class="text-sm uppercase mb-10">Update Delayed Months</div>

            <div class="space-y-5 mb-5">
                <div>
                    <div class="text-sm text-gray-700">Congregation</div>
                    <div class="text-lg font-semibold">{{ target.cong }}</div>
                </div>

                <div>
                    <div class="text-sm text-gray-700">Months Delayed</div>

                    <select name="" id="" v-model="delayedMonths"
                        class="py-2 px-0 text-lg font-semibold border-0 border-b border-b-gray-400 w-full outline-0">
                        <option :value="0">On time</option>
                        <option :value="1">1 month</option>
                        <option :value="2">2 months</option>
                        <option :value="3">3 months</option>
                        <option :value="4">4 months</option>
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
    import type { MonthlyContribution } from '@/types/accounts';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { ref, watch } from 'vue';
    import FetchingSpinner from '../FetchingSpinner.vue';

    const delayedMonths = ref(0)
    const posting = ref(false)

    const { target } = defineProps<{
        target: MonthlyContribution | null
    }>()

    const accounts = useAccountsStore()
    const auth = useAuthStore()

    const emits = defineEmits(['unset-target'])

    const unsetTarget = () => {
        emits('unset-target')
    }

    const post = async () => {
        if (!target) return
        posting.value = true

        await accounts.setContribution({
            target: 'set-contribution-delay',
            token: auth.token,
            data: {
                cong: target.cong,
                months: delayedMonths.value
            }
        })

        unsetTarget()
        posting.value = false
    }

    watch(() => target, (val) => {
        delayedMonths.value = val?.delayed || 0
    }, { immediate: true })
</script>