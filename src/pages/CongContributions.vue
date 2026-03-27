<template>
    <div class="p-6">
        <div>
            <div @click="exit" class="flex space-x-0 items-center cursor-pointer">
                <span>
                    <CaretLeftIcon class="h-5 w-5" />
                </span>
                <span>Operating Committee</span>
            </div>
            <div class="font-bold text-2xl mb-10">
                Pending Contributions
            </div>

            <div class="space-y-5">
                <template v-for="cong in accounts.contributions" :key="cong.cong">
                    <ContributionItem :cong />
                </template>

                <div class="flex justify-between py-3">
                    <div class="w-1/2 font-bold text-lg">Contributions</div>
                    <div class="text-2xl font-bold">{{ accounts.formattedReceivableContributions }}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import ContributionItem from '@/components/ContributionItem.vue';
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