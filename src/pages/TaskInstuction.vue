<template>
    <div class="absolute top-0 left-0 z-20 w-full h-full bg-white p-5 overflow-y-auto">
        <div class="underline py-2" @click="emits('close')">Task Instructions</div>
        
        <div v-if="instructions.fetching">
            <FetchingSpinner />
        </div>
        
        <div class="p-2" v-if="instructions.active">
            <div class="mb-5">
                <div class="uppercase text-xs">{{ instructions.active.aspect }}</div>
                <div class="text-2xl font-bold">{{ instructions.active.task }}</div>
                <div class="text-sm">{{ instructions.active.frequency }}</div>
            </div>

            <div v-if="instructions.active.safety" class="bg-red-100 p-2 rounded-xs my-2">{{ instructions.active.safety
                }}</div>

            <div v-for="e in instructions.active.elements" :key="e.element" class="mb-8">
                <div class="text-blue-500 font-bold text-xl py-2">{{ e.element }}</div>
                <div class="space-y-5">
                    <div v-for="i in e.items" :key="i" class="">
                        <div class="flex gap-2 items-start">
                            <span class="flex mt-1 h-4 w-4 rounded-sm border"></span>
                            <span class="flex-1">{{ i }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
    import FetchingSpinner from '@/components/FetchingSpinner.vue';
    import { useInstructionsStore } from '@/stores/tasks-instructions';

    const instructions = useInstructionsStore()
    const emits = defineEmits(['close'])
</script>