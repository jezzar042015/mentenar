<template>
    <Teleport to="body">
        <PayableForm v-if="form" @close="form = false" />
    </Teleport>

    <div class="p-6 h-screen overflow-auto">
        <div @click="exit" class="flex space-x-0 items-center cursor-pointer">
            <span>
                <CaretLeftIcon class="h-5 w-5" />
            </span>
            <span>Operating Committee</span>
        </div>
        <div class="font-bold text-2xl mb-10">
            Reimbursements & Payables
        </div>
        <div class="space-y-6 pb-10">
            <template v-for="(r, i) in accounts.forReimbursementsItems" :key="i">
                <ReimbursementItem :r />
            </template>

            <div @click="form = true" class="bg-white shadow-md rounded-md px-4 py-6 flex gap-2 items-center">
                <span>
                    <AddIcon class="h-6 w-6" />
                </span>
                <span>Create New Payable</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import PayableForm from '@/components/modals/PayableForm.vue';
    import ReimbursementItem from '@/components/ReimbursementItem.vue';
    import AddIcon from '@/icons/AddIcon.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import type { Reimbursement } from '@/types/accounts';
    import { ref } from 'vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    const target = ref<Reimbursement | null>()
    const form = ref(false)
    const unsetTarget = () => { target.value = null }

    const exit = () => {
        view.showHeader = true
        view.setView('profile')
    }

</script>