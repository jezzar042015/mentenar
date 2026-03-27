<template>
    <div class="p-6">
        <div>
            <div @click="exit" class="flex space-x-0 items-center">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="font-bold text-2xl mb-10">
                Unpaid Approved Expenses
            </div>

            <div class="space-y-5">
                <template v-for="a in accounts.approved" :key="a.date + a.name">
                    <ApprovedExpenseItem :a />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ApprovedExpenseItem from '@/components/ApprovedExpenseItem.vue';
import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const views = useViewsStore()
    const accounts = useAccountsStore()

    const exit = () => {
        views.showHeader = true
        views.setView('profile')
    }
    onMounted(() => {
        views.showHeader = false
    })
</script>
