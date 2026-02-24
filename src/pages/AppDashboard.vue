<template>
    <div class="bg-white p-4">
        <div class="mt-4">
            <h2 class="text-sm">This month</h2>

            <!-- late preventive months -->
            <DashCurrentPreventive />

            <template v-for="item in followup.overdue" :key="item.task">
                <DashFollowUpCard :item />
            </template>

            <template v-for="item in followup.dueSoon" :key="item.task">
                <DashFollowUpCard :item />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import DashCurrentPreventive from '@/components/DashCurrentPreventive.vue';
    import DashFollowUpCard from '@/components/DashFollowUpCard.vue';
    import { useFollowupsStore } from '@/stores/followups';

    const followup = useFollowupsStore()

</script>
