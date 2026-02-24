<template>
    <div class="p-4 bg-white">
        <div v-if="followup.active">
            <h2 class="text-xl font-bold my-5"># {{ followup.active.task }}</h2>

            <div class="mb-5">
                <span class="px-3 py-1 border-2 border-blue-500 text-sm rounded-md">{{ followup.active.status || 'Not Started'}}</span>
            </div>

            <div>
                <span>Started: </span>
                <span>{{ followup.active.started }}</span>
            </div>
            <div>
                <span>Due: </span>
                <span>{{ followup.active.target }}</span>
            </div>


            <div>
                <span>Assigned to: </span>
                <span>{{ followup.active.assignees }}</span>
            </div>

            <div class="flex flex-col my-5">
                <span>Remarks:</span>
                <span>{{ followup.active.remarks }}</span>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import { useFollowupsStore } from '@/stores/followups';

    const followup = useFollowupsStore()
</script>