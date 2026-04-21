<template>
    <div>

        <!-- mobile screens -->
        <div class="block md:hidden">
            <div class="text-gray-800">For Reimbursements</div>
            <div @click="gotoReimbursements" class="flex justify-between md:hidden cursor-pointer">
                <span class="text-2xl font-semibold hover:scale-105 transition-transform duration-300">
                    {{ accounts.formattedReimbursementsBalance }}
                </span>
                <span>
                    <CaretLeftIcon class="h-10 w-10 rotate-180" />
                </span>
            </div>
        </div>

        <!-- larger screens -->
        <div class="hidden md:block">
            <div class="flex justify-between items-center">
                <div class="text-cyan-700 font-semibold text-xl">For Reimbursements</div>
                <div class="text-2xl font-semibold w-1/3 text-right px-10 text-cyan-700">
                   &dash; {{ accounts.formattedReimbursementsBalance }}
                </div>

            </div>
            <div class="hidden md:flex">
                <div class="w-2/3 bg-white px-5">
                    <template v-for="(r, i) in accounts.forReimbursementsItems" :key="i">
                        <ReimbursementItem :r />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue'
    import { useAccountsStore } from '@/stores/accounts'
    import { useViewsStore } from '@/stores/views'
    import ReimbursementItem from './ReimbursementItem.vue'


    const accounts = useAccountsStore()
    const view = useViewsStore()

    const gotoReimbursements = () => {
        view.showHeader = false
        view.setView('reimbursements')
    }
</script>