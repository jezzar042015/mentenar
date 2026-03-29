<template>
    <div class="p-6">
        <Teleport :to="'body'">
            <ContributionsForm :target @unset-target="target = null" />
        </Teleport>

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
                    <ContributionItem :cong @click="target = cong" />
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
    import type { MonthlyContribution } from '@/types/accounts';
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted, ref, Teleport } from 'vue';
    import ContributionsForm from '@/components/modals/ContributionsForm.vue';

    const views = useViewsStore()
    const accounts = useAccountsStore()

    const target = ref<MonthlyContribution | null>(null)

    const exit = () => {
        views.showHeader = true
        views.setView('profile')
    }

    onMounted(() => {
        views.showHeader = false
    })
</script>