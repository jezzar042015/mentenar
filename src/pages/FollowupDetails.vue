<template>
    <div class="p-4 bg-white">
        <div v-if="followup.active">
            <div class="my-4">
                <span class="px-3 py-1 border-2 border-blue-500 text-sm rounded-md">
                    {{ followup.active.status || 'Not Started' }}
                </span>
            </div>

            <h2 class="text-xl font-bold my-5">{{ followup.active.task }}</h2>


            <div class="space-y-3">
                <div class="flex gap-2 items-center">
                    <span>
                        <CalendarIcon class="h-4 w-4" />
                    </span>
                    <span>Started:</span>
                    <span class="font-bold text-sm">{{ startDisplay }}</span>
                </div>

                <div class="flex gap-2 items-center">
                    <span>
                        <CalendarIcon class="h-4 w-4" />
                    </span>
                    <span>Due:</span>
                    <span class="font-bold text-sm">{{ dueDisplay }}</span>
                </div>

                <div>
                    <div class="flex gap-2 items-center">
                        <span>
                            <PersonIcon class="h-4 w-4" />
                        </span>
                        <span v-if="followup.active.assignees">Assigned to: </span>
                        <span v-else>Not Assigned</span>

                    </div>
                    <div>
                        <span class="font-bold text-sm">{{ followup.active.assignees }}</span>
                    </div>
                </div>
            </div>


            <div class="flex flex-col mt-10 space-y-2" v-if="followup.active.remarks">
                <span class="text-sm">Description</span>
                <span>{{ followup.active.remarks }}</span>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import CalendarIcon from '@/icons/CalendarIcon.vue';
    import PersonIcon from '@/icons/PersonIcon.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { computed } from 'vue';

    const followup = useFollowupsStore()

    const startDisplay = computed(() => {
        if (!followup.active) return ''
        if (!followup.active.started) return 'Not Started'
        const d = new Date()
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

    const dueDisplay = computed(() => {
        if (!followup.active) return ''
        if (!followup.active.target) return 'Not Set'
        const d = new Date(followup.active.target)
        if (!d) return '' 
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

    const today = computed(() => {
        if (!followup.active) return ''
        const d = new Date()
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

</script>