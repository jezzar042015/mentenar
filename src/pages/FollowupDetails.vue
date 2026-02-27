<template>
    <div class="p-4 bg-white h-full mb-20">
        <div v-if="followup.active">
            <div class="my-4 flex gap-4 items-center">
                <span class="px-3 py-1 border border-amber-500 text-amber-600 text-sm rounded-md self-center">
                    {{ followup.active.status || 'Not Started' }}
                </span>
            </div>

            <h2 class="text-xl font-bold my-5 text-amber-600">{{ followup.active.task }}</h2>


            <div class="space-y-3">

                <template v-if="followup.active.status !== 'Completed'">
                    <div class="flex gap-2 items-center">
                        <span>
                            <CalendarIcon class="h-4 w-4" />
                        </span>
                        <span>Noted:</span>
                        <span class="font-bold text-sm">{{ startDisplay }}</span>
                    </div>

                    <div class="flex gap-2 items-center">
                        <span class="">
                            <CalendarIcon class="h-4 w-4" />
                        </span>
                        <span>Due:</span>
                        <span class="font-bold text-sm">{{ dueDisplay }}</span>
                    </div>
                </template>

                <template v-else>
                    <div class="flex gap-2 items-center">
                        <span class="">
                            <CalendarIcon class="h-4 w-4" />
                        </span>
                        <span>Completed:</span>
                        <span class="font-bold">{{ completedDisplay }}</span>
                    </div>
                </template>

                <div>
                    <div class="flex gap-2 items-start">
                        <span class="mt-0.5">
                            <PersonIcon class="h-4 w-4" />
                        </span>
                        <span v-if="followup.active.assignees">Assigned to {{ followup.active.assignees }}</span>
                        <span v-else>Not Assigned</span>

                    </div>
                </div>
            </div>


            <div class="flex flex-col mt-5 space-y-1 p-2 bg-amber-50" v-if="followup.active.remarks">
                <span class="text-xs">Description</span>
                <span>{{ followup.active.remarks }}</span>
            </div>

            <div class="mt-8" v-if="followup.active.list.length > 0">
                <div class="flex items-center justify-between pr-10">
                    <h2 class="uppercase font-semibold mb-3 text-amber-600">Checklist</h2>
                    <div class="-mt-3">
                        <CircularProgress :all-count="followup.active.list.length" :completed-count="completedCount"
                            :color="'amber'" :label="'percent'" />
                    </div>
                </div>

                <div class="space-y-2 px-1">
                    <div v-for="value in followup.active.list" :key="value.task" class="flex items-start space-x-2">
                        <span :class="[
                            'flex mt-1 h-4 w-4 rounded-sm border relative overflow-hidden',
                            value.completed ? 'bg-amber-500 border-amber-500 scale-105' : 'bg-transparent border-black/70 scale-100'
                        ]">
                            <CheckIcon v-if="value.completed" class="absolute -top-1 -left-0.5 h-5 w-5 text-white" />
                        </span>
                        <span :class="['flex-1', value.completed ? 'line-through' : '']">{{ value.task }}</span>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import CircularProgress from '@/components/CircularProgress.vue';
    import CalendarIcon from '@/icons/CalendarIcon.vue';
    import CheckIcon from '@/icons/CheckIcon.vue';
    import PersonIcon from '@/icons/PersonIcon.vue';
    import { useFollowupsStore } from '@/stores/followups';
    import { computed } from 'vue';

    const followup = useFollowupsStore()

    const startDisplay = computed(() => {
        if (!followup.active) return ''
        if (!followup.active.started) return 'Not Started'
        const d = new Date(followup.active.started)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

    const dueDisplay = computed(() => {
        if (!followup.active) return ''
        if (!followup.active.target) return 'Not Set'
        const d = new Date(followup.active.target)
        if (!d) return ''
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

    const completedDisplay = computed(() => {
        if (!followup.active) return ''
        if (!followup.active.completed) return 'Not Set'
        const d = new Date(followup.active.completed)
        if (!d) return ''
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' '
    })

    const today = computed(() => {
        if (!followup.active) return ''
        const d = new Date()
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' '
    })

    const completedCount = computed(() => {
        if (!followup.active) return 0
        return followup.active.list.filter(item => item.completed).length
    })

</script>