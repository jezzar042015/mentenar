<template>
    <div class="" @click="toggleChecked">
        <div class="flex gap-2 items-start">
            <span :class="[
                'flex mt-1 h-4 w-4 rounded-sm border relative overflow-hidden transition-all duration-200 ease-out',
                isChecked ? 'bg-black border-black scale-105' : 'bg-transparent border-black/70 scale-100'
            ]">
                <Transition name="check-pop">
                    <CheckIcon v-if="isChecked" class="absolute -top-1 -left-0.5 h-5 w-5 text-white" />
                </Transition>
            </span>
            <span :class="[
                'flex-1 transition-all duration-200 ease-out',
                isChecked ? 'line-through opacity-70' : 'opacity-100'
            ]">
                {{ checkItem }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CheckIcon from '@/icons/CheckIcon.vue';
    import { useInstructionsStore } from '@/stores/tasks-instructions';
    import { computed } from 'vue';

    const { checkItem, tiId, elementIndex, checkIndex } = defineProps<{
        checkItem: string
        tiId: string
        elementIndex: number
        checkIndex: number
    }>()

    const instruction = useInstructionsStore()

    const isChecked = computed(() => {
        return instruction.checks.includes(`${tiId}.${elementIndex}.${checkIndex}`)
    })

    const toggleChecked = () => {
        const checkKey = `${tiId}.${elementIndex}.${checkIndex}`
        if (isChecked.value) {
            instruction.removeCheck(checkKey)
        } else {
            instruction.addCheck(checkKey)
        }
    }
</script>

<style scoped>

    .check-pop-enter-active,
    .check-pop-leave-active
    {
        transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .check-pop-enter-from,
    .check-pop-leave-to
    {
        opacity: 0;
        transform: scale(0.6);
    }

    .check-pop-enter-to,
    .check-pop-leave-from
    {
        opacity: 1;
        transform: scale(1);
    }
</style>