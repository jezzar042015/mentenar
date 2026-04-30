<template>
    <!-- mobile screens -->
    <div :class="['md:hidden shadow-md rounded-md p-4 space-y-5 relative', showActions ? 'bg-black/10' : 'bg-white']">
        <div class="absolute right-2 top-0">
            <div class="p-3 relative" @click.prevent="showActions = true">
                <ElipsisIcon class="h-6 w-6 opacity-85" />
                <div ref="actions" v-if="showActions"
                    class="shadow-lg rounded bg-white absolute right-0 top-auto whitespace-nowrap space-y-1 p-1">
                    <div class="p-3 bg-white cursor-pointer rounded-sm hover:bg-amber-300">Make Changes</div>
                    <hr class="border-0 border-b border-b-gray-100">
                    <div @click="setAsReimbursed" class="p-3 bg-white cursor-pointer rounded-sm hover:bg-amber-300">Set as Reimbursed</div>
                </div>
            </div>
        </div>
        <div>
            <div class="text-xs text-gray-600">Payee</div>
            <div class="text-2xl">{{ r.name }}</div>
        </div>
        <div>
            <div class="text-xs text-gray-600">{{ isGCash ? 'GCash' : 'Bank' }} Account</div>
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
    import ElipsisIcon from '@/icons/ElipsisIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import type { Reimbursement } from '@/types/accounts';
    import { onClickOutside } from '@vueuse/core';
    import { computed, ref, useTemplateRef } from 'vue';

    const { r } = defineProps<{
        r: Reimbursement
    }>()

    const actions = useTemplateRef<HTMLElement>('actions')
    const account = useAccountsStore()
    const auth = useAuthStore()
    const showActions = ref(false)

    onClickOutside(actions, () => showActions.value = false)

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

    const bankDetails = computed(() => {
        if (isGCash.value) return ''
        return r.gcash.replaceAll('\n', '<br>')
    })

    const setAsReimbursed = async () => {
        return

        // await account.updatePayableStatus({
        //     token: auth.token,
        //     target: 'update-payable-status',
        //     data: {
        //         amountCheck: r.amount,
        //         nameCheck: r.name,
        //         status: "Reimbursed",
        //         rowNum: 0,  
        //     }

        // })
    }
</script>
