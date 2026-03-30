<template>
    <div @click="gotoTransactions" class="md:flex md:justify-between">
        <div class="text-gray-800 md:font-semibold md:text-xl md:text-cyan-700">KHOC Fund Balance</div>
        <div class="md:pr-10 md:text-cyan-700 flex justify-between ">
            <span class="text-2xl font-semibold">
                {{ accounts.formattedBalance }}
            </span>
            <span class="md:hidden">
                <CaretLeftIcon class="h-10 w-10 rotate-180" />
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    const gotoTransactions = () => {
        view.setView('transactions')
    }
</script>