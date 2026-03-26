<template>
    <div class="p-6">
        <div @click="exit" class="flex space-x-0 items-center">
            <span>
                <CaretLeftIcon class="h-5 w-5" />
            </span>
            <span>Operating Committee</span>
        </div>
        <div class="font-bold text-2xl mb-10">
            Pending Reimbursements
        </div>
        <div class="space-y-6">
            <template v-for="(r, i) in accounts.forReimbursementsItems" :key="i">
                <ReimbursementItem :r />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ReimbursementItem from '@/components/ReimbursementItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }
</script>