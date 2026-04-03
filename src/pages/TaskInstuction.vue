<template>
    <div class="absolute top-0 left-0 z-20 w-full h-full bg-white p-5 overflow-y-auto">
        <div class="md:max-w-300 mx-auto ">


            <div class="pt-2 mb-6 flex gap-0 items-center cursor-pointer" @click="emits('close')">
                <CaretLeftIcon class="h-5 w-5" />
                <span class="text-sm"> Task Instructions </span>
            </div>

            <div v-if="instructions.fetching">
                <FetchingSpinner />
            </div>

            <div class="p-2" v-if="instructions.active">
                <div class="mb-5">
                    <div class="uppercase text-xs">{{ instructions.active.aspect }}</div>
                    <div class="text-2xl font-bold">{{ instructions.active.task }}</div>
                    <div class="text-sm">{{ instructions.active.frequency }}</div>
                </div>

                <div class="flex gap-3 items-start p-3 bg-yellow-100 rounded-md shadow mb-5">
                    <span>
                        <MobileChatIcon class="h-18 w-18" />
                    </span>
                    <p class="text-sm "> <b> Please take photos</b> of any broken or deteriorating conditions that will
                        not
                        be
                        addressed during your inspection and maintenance.
                        Kindly send these photos to any KHOC member so they can coordinate the necessary repairs.
                    </p>
                </div>

                <div v-if="instructions.active.safety" class="bg-red-100 p-2 rounded-md my-2 shadow">
                    {{ instructions.active.safety }}
                </div>

                <div v-for="(e, ei) in instructions.active.elements" :key="e.element" class="mb-8">
                    <div class="text-blue-500 font-bold text-xl py-2">{{ e.element }}</div>
                    <div class="space-y-5">
                        <div v-for="(checkItem, checkIndex) in e.items" :key="checkIndex" class="cursor-pointer hover:text-blue-800">
                            <InstructionCheckItem :check-item :check-index :element-index="ei"
                                :ti-id="instructions.active.id" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import FetchingSpinner from '@/components/FetchingSpinner.vue';
    import InstructionCheckItem from '@/components/InstructionCheckItem.vue';
    import CaretLeftIcon from '@/icons/CaretLeftIcon.vue';
    import MobileChatIcon from '@/icons/MobileChatIcon.vue';
    import { useInstructionsStore } from '@/stores/tasks-instructions';

    const instructions = useInstructionsStore()
    const emits = defineEmits(['close'])
</script>