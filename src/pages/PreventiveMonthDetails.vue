<template>
    <TaskInstuction v-if="viewTi" @close="viewTi = false" />

    <div class="bg-white p-4" v-else>
        <div class="px-2 pb-5" v-if="pm.activeMonthData?.month">
            <div class="mt-5">
                <div class="text-xl font-semibold flex gap-2 items-center">
                    <span>
                        <CalendarIcon class="h-6 w-6" />
                    </span>
                    <span>
                        {{ pm.activeMonthData.month }}
                    </span>
                </div>
            </div>

            <div class="text-base">
                {{ pm.activeMonthData.assigned }} Congregation
            </div>

            <div class="mt-10 text-xl mb-2 font-semibold flex gap-4 items-center">
                <span>
                    Task Items
                </span>
                <span class="text-gray-500">
                    &bullet;
                </span>
                <span class="text-base font-normal text-gray-500">
                    {{ completedTasksCount }} of {{ pm.activeMonthData.tasks.length }}
                </span>
            </div>
            <div class="space-y-2">
                <div v-for="t in sortedTasks" class="shadow p-3 flex justify-between gap-4 items-center"
                    @click="openTaskInstructions(t.tiId)">
                    <div :class="['h-3 w-3 rounded-full', t.completed ? 'bg-blue-400' : 'bg-red-400']"></div>
                    <div :class="['flex-1', t.completed ? 'line-through' : '']">{{ t.task }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import CalendarIcon from '@/icons/CalendarIcon.vue';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useInstructionsStore } from '@/stores/tasks-instructions';
    import { computed, ref } from 'vue';
    import TaskInstuction from './TaskInstuction.vue';

    const pm = usePreventiveStore()
    const ti = useInstructionsStore()
    const viewTi = ref(false)

    const openTaskInstructions = (tiId: string) => {
        ti.activeId = tiId
        viewTi.value = true
    }

    const sortedTasks = computed(() => {
        if (!pm.activeMonthData) return []
        return [...pm.activeMonthData.tasks].sort((a, b) => {
            if (a.completed === b.completed) return 0
            return a.completed ? 1 : -1
        })
    });

    const completedTasksCount = computed(() => {
        if (!pm.activeMonthData) return 0
        return pm.activeMonthData.tasks.filter(t => t.completed).length
    })

</script>