<template>
    <Teleport to="body">
        <TransactionDetails :target @unset-target="unsetTarget" />
        <TransactionForm v-if="form" @close="form = false" />
    </Teleport>
    <div class="h-screen overflow-hidden flex flex-col">
        <div class="pt-6 px-6 pb-3 cursor-pointer">
            <div @click="exit" class="flex space-x-0 items-center w-fit pr-5">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="mb-0 flex justify-between items-center">
                <span class="sm:hidden font-bold text-2xl ">Primary</span>
                <span class="hidden sm:inline font-bold text-2xl ">Primary Account</span>
                <div class="flex gap-2">
                    <div class="relative">
                        <button v-if="accounts.branchFundTransactions.length > 0"
                            :class="['relative group text-wrap text-xs shadow rounded-sm transition-all cursor-pointer flex gap-2', accounts.transactionsOnFilter ? 'bg-lime-700 text-white ' : 'hover:bg-lime-800 hover:text-white']">
                            <span @click="accounts.transactionsOnFilter = !accounts.transactionsOnFilter"
                                class="py-2 pl-4 pr-2">
                                {{ accounts.transactionsFilter }}
                            </span>
                            <span @click="showCategoriesSelection = !showCategoriesSelection"
                                class="py-2 pl-2 pr-2 border-0 border-l border-l-gray-200 group-hover:border-l-lime-200/25">
                                <CaretLeftIcon class="h-5 w-5 -mt-1 -rotate-90" />
                            </span>

                        </button>
                        <!--  -->
                        <div v-if="showCategoriesSelection" ref="categories"
                            class="absolute right-0 top-full mt-1 bg-white shadow z-10 rounded">
                            <ul class="py-2">
                                <li v-for="tc in accounts.transactionCategories" @click="setTransactionCategory(tc)"
                                    class="py-2 px-4 text-left text-xs whitespace-nowrap">{{ tc
                                    }}</li>
                            </ul>
                        </div>

                    </div>
                    <button @click="form = true"
                        class="text-wrap px-2 bg-lime-700 text-white text-xs shadow p-2 rounded-sm -mr-3 hover:bg-lime-800 transition-all cursor-pointer">
                        New
                    </button>
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

            <template v-for="group in accounts.filteredTransactions" :key="group.month">
                <MonthGroup :group @set-target="setTarget" />
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import MonthGroup from '@/components/transactions/MonthGroup.vue';
    import TransactionDetails from '@/components/modals/TransactionDetails.vue';
    import TransactionForm from '@/components/modals/TransactionForm.vue';
    import type { Transaction } from '@/types/accounts';
    import { onClickOutside } from '@vueuse/core';
    import { onMounted, ref, useTemplateRef } from 'vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';

    const accounts = useAccountsStore()
    const view = useViewsStore()
    const form = ref(false)

    const target = ref<Transaction | null>()
    const unsetTarget = () => { target.value = null }
    const showCategoriesSelection = ref(false)

    const categories = useTemplateRef<HTMLElement>('categories')
    onClickOutside(categories, () => showCategoriesSelection.value = false)

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }

    const setTransactionCategory = (category: string) => {
        accounts.transactionsFilter = category
        if (!accounts.transactionsOnFilter) accounts.transactionsOnFilter = true
        showCategoriesSelection.value = false
    }

    const setTarget = (t: Transaction) => {
        target.value = t
    }

    onMounted(() => {
        view.showHeader = false
    })
</script>