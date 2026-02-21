<template>
    <div class="bg-white w-full h-full absolute top-0 left-0 p-4" v-if="show">
        <div class="flex justify-between items-center">
            <div class="text-2xl font-semibold">{{ data.month }} 2026</div>
            <span class="pr-2" @click="emits('close')">
                <CloseIcon class="h-6 w-6 opacity-80" />
            </span>
        </div>

        <div class="text-lg">{{ data.assigned }} Congregation</div>

        <div class="mt-6 text-xl mb-2 font-semibold">Task Items</div>
        <div class="space-y-2">
            <div v-for="t in data.tasks" class="shadow p-3" @click="openTaskInstructions(t.url)">
                {{ t.task }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CloseIcon from '@/icons/CloseIcon.vue';
    import type { PreventiveResponse } from '@/types/preventive';

    const { data, show } = defineProps<{
        data: PreventiveResponse,
        show: boolean,
    }>()

    const openTaskInstructions = (url: string) => {
        window.open(url, '_blank');
    } 

    const emits = defineEmits(['close'])


</script>
