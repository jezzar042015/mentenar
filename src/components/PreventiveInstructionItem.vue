<template>
    <div class="shadow-md rounded-md p-3 flex justify-between gap-4 items-center cursor-pointer"
        @click="emits('open-instructions', t.tiId)">
        <div :class="['h-3 w-3 rounded-full', t.completed ? 'bg-blue-400' : 'bg-red-400']"></div>
        <div :class="['flex-1', t.completed ? 'line-through text-gray-400' : '']">{{ t.task }}</div>
        <div class="h-full flex">
            <CaretLeftIcon class="h-5 w-5 rotate-180 text-gray-400" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PreventiveItem } from '@/types/preventive';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';

    const { t } = defineProps<{
        t: PreventiveItem
    }>()
    const emits = defineEmits(['open-instructions'])
</script>