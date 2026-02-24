<template>
    <div class="bg-white p-5">
        <div class="mt-4">

            <div class="space-y-5">

                <template v-for="value in pm.lateMonths" :key="value.month">
                    <DashPreventiveCard :monthItem="value" :is-late="true"/>
                </template>

                <DashPreventiveCard :month-item="pm.currentMonth" v-if="pm.currentMonth"/>

                <template v-for="item in followup.overdue" :key="item.task">
                    <DashFollowUpCard :item />
                </template>

                <template v-for="item in followup.dueSoon" :key="item.task">
                    <DashFollowUpCard :item />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DashFollowUpCard from '@/components/DashFollowUpCard.vue';
    import DashPreventiveCard from '@/components/DashPreventiveCard.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { usePreventiveStore } from '@/stores/preventive';

    const followup = useFollowupsStore()
    const pm = usePreventiveStore()
</script>
