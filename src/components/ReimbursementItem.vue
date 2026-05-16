<template>
    <!-- mobile screens -->
    <div :class="['md:hidden shadow-md rounded-md p-4 space-y-5 relative', showActions ? 'bg-black/10' : 'bg-white']">
        <div class="absolute right-2 top-0">
            <div class="p-3 relative cursor-pointer" @click.prevent="showActions = true">
                <ElipsisIcon class="h-6 w-6 opacity-85" />
                <DropdownActions ref="actions" :show-actions @set-as-reimbursed="setAsReimbursed"
                    @set-and-create="setStatusAndCreateTransaction" />
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
        <div v-if="posting"
            class="z-30 absolute top-0 left-0 w-full h-full bg-white/90 flex items-center justify-center">
            <FetchingSpinner />
        </div>
        <!-- <Teleport to="body">

        </Teleport> -->
    </div>

    <!-- larger screens -->
    <div class="hidden md:block relative" @click.prevent="showActions = true">
        <div class="flex justify-between items-center border-0 border-b border-b-gray-300 py-1 cursor-pointer"
            :class="{ 'bg-amber-300 rounded-sm px-2': showActions }">
            <div class="text-sm">{{ r.desc }}</div>
            <div class="font-semibold">{{ formattedAmount }}</div>
        </div>
        <DropdownActions ref="actions" :show-actions @set-as-reimbursed="setAsReimbursed"
            @set-and-create="setStatusAndCreateTransaction" />
    </div>

    <Teleport to="body">
        <TransactionForm v-if="transactionForm" :draft="transactionDraft" @close="transactionForm = false"
            @update-isposting="listenTransactionPosting" />
    </Teleport>
</template>

<script setup lang="ts">
    import ElipsisIcon from '@/icons/ElipsisIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useAuthStore } from '@/stores/auth';
    import { onClickOutside } from '@vueuse/core';
    import { computed, ref, useTemplateRef } from 'vue';
    import type { Reimbursement, Transaction } from '@/types/accounts';
    import FetchingSpinner from './FetchingSpinner.vue';
    import DropdownActions from './payables/DropdownActions.vue';
    import TransactionForm from './modals/TransactionForm.vue';

    const { r } = defineProps<{
        r: Reimbursement
    }>()

    const transactionForm = ref(false)
    const transactionDraft = ref<Transaction>()

    const account = useAccountsStore()
    const auth = useAuthStore()
    const showActions = ref(false)
    const posting = ref(false)

    const actions = useTemplateRef<HTMLElement>('actions')
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
        const d = r.date.split("T")[0]

        showActions.value = false
        posting.value = true
        await account.updatePayableStatus(
            {
                token: auth.token,
                target: 'update-payable-status',
                data: {
                    status: "Reimbursed",
                    amountCheck: r.amount,
                    nameCheck: r.name,
                    dateCheck: d,
                    descCheck: r.desc
                }
            }
        );

        posting.value = false
    }

    const setStatusAndCreateTransaction = () => {
        transactionDraft.value = {
            date: r.date.split("T")[0],
            amount: r.amount,
            balance: 0,
            desc: r.desc,
            payee: r.name,
            remarks: "",
            category: "",
            flow: "OUT",
        }

        transactionForm.value = true
    }

    const listenTransactionPosting = async () => {
        await setAsReimbursed()
    }
</script>
