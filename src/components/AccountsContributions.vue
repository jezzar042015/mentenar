<template>
    <div>
        <!-- mobile screens -->
        <div class="md:hidden">
            <div class="text-gray-800">Pending Contributions</div>
            <div @click="gotoContributions" class="flex justify-between cursor-pointer ">
                <span class="text-2xl font-semibold">
                    {{ accounts.formattedReceivableContributions }}
                </span>
                <span>
                    <CaretLeftIcon class="h-10 w-10 rotate-180" />
                </span>
            </div>
        </div>

        <!-- md screens -->
        <div class="hidden md:flex justify-between">
            <div class="font-semibold text-xl text-cyan-700">Pending Congregation Contributions</div>
            <div class="text-2xl font-semibold w-1/3 text-right px-10 text-cyan-700">
                {{ accounts.formattedReceivableContributions }}
            </div>
        </div>

        <div class="hidden md:flex">
            <div class="w-2/3 bg-white px-5">
                <template v-for="c in accounts.contributions" :key="c.cong">
                    <ContributionItem :cong="c" />
                </template>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import ContributionItem from './ContributionItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    const gotoContributions = () => {
        view.setView('contributions')
    }
</script>
