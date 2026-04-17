<template>
    <Teleport to="body">
        <TransactionDetails :target @unset-target="unsetTarget" />
        <TransactionForm v-if="form" @close="form = false" />
    </Teleport>
    <div class="h-screen overflow-hidden flex flex-col">
        <div class="pt-6 px-6 pb-3 cursor-pointer">
            <div @click="exit" class="flex space-x-0 items-center">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="mb-0 flex justify-between items-center">
                <span class="font-bold text-2xl ">Primary Account</span>
                <div class="flex gap-2">
                    <button v-if="accounts.branchFundTransactions.length > 0" @click="filterBranchProjects = !filterBranchProjects"
                        :class="['text-wrap text-xs shadow py-2 px-4 rounded-sm transition-all cursor-pointer ', filterBranchProjects ? 'bg-lime-700 text-white ' : 'hover:bg-lime-800 hover:text-white']">
                        Branch Project</button>
                    <button @click="form = true"
                        class="text-wrap w-16 bg-lime-700 text-white text-xs shadow p-2 rounded-sm -mr-3 hover:bg-lime-800 transition-all cursor-pointer">New</button>
                </div>
            </div>
        </div>

        <!-- Header -->
        <div
            class="mx-1 p-2 bg-lime-700 text-white font-semibold grid grid-cols-3 md:grid-cols-8 text-sm gap-1 rounded-xs">
            <div class="">Date</div>
            <div class="hidden md:inline col-span-1">Payee</div>
            <div class="hidden md:inline col-span-4">Description</div>
            <div class="text-right">Amount</div>
            <div class="text-right">Balance</div>
        </div>

        <!-- Transaction Items -->
        <div class="flex-1 overflow-y-auto pt-2 pb-10">
            <template v-if="!filterBranchProjects">
                <template v-for="(t, i) in accounts.reversedTransactions" :key="i">
                    <TransactionItem :t @click="target = t" />
                </template>
            </template>

            <template v-else>
                <template v-for="(t, i) in accounts.branchFundTransactions" :key="i">
                    <TransactionItem :t @click="target = t" />
                </template>
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">
    import TransactionItem from '@/components/TransactionItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import TransactionDetails from '@/components/modals/TransactionDetails.vue';
    import TransactionForm from '@/components/modals/TransactionForm.vue';
    import type { Transaction } from '@/types/accounts';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted, ref } from 'vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()
    const form = ref(false)

    const filterBranchProjects = ref(false)

    const target = ref<Transaction | null>()
    const unsetTarget = () => { target.value = null }

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }

    onMounted(() => {
        view.showHeader = false
    })
</script>
