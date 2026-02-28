<template>
    <TaskInstuction v-if="viewTi" @close="viewTi=false"/>
    
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

            <div class="mt-10 text-xl mb-2 font-semibold">Task Items &bullet; {{ pm.activeMonthData.tasks.length }}
            </div>
            <div class="space-y-2">
                <div v-for="t in pm.activeMonthData.tasks" class="shadow p-3 flex justify-between gap-4 items-center"
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
    import { ref } from 'vue';
    import TaskInstuction from './TaskInstuction.vue';

    const pm = usePreventiveStore()
    const ti = useInstructionsStore()
    const viewTi = ref(false)

    const openTaskInstructions = (tiId: string) => {
        ti.activeId = tiId
        viewTi.value = true
    }

</script>