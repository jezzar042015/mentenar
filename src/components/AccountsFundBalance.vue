<template>
    <div class="md:flex md:justify-between">
        <div class="text-gray-800 md:font-semibold md:text-xl md:text-cyan-700">KHOC Fund Balance</div>
        <div class="text-2xl md:pr-10 font-semibold md:text-cyan-700">{{
            accounts.formattedBalance }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAccountsStore } from '@/stores/accounts';

    const accounts = useAccountsStore()
</script>