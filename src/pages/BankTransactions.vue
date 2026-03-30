<template>
    <div class="h-screen overflow-hidden flex flex-col">
        <div class="pt-6 px-6 pb-3">
            <div @click="exit" class="flex space-x-0 items-center">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="font-bold text-2xl mb-0">
                Primary Account
            </div>
        </div>
        <div class="mx-1 p-2 bg-lime-700 text-white font-semibold grid grid-cols-3 text-sm gap-1 rounded-xs">
            <div class="">Date</div>
            <div class="text-right">Amount</div>
            <div class="text-right">Balance</div>
        </div>

        <div class="flex-1 overflow-y-auto pt-2 pb-10">
            <template v-for="(t, i) in accounts.reversedTransactions" :key="i">
                <TransactionItem :t />
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">
    import TransactionItem from '@/components/TransactionItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }

    onMounted(() => {
        view.showHeader = false
    })
</script>
