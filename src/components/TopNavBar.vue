<template>
    <div class="sticky w-full bg-white shadow top-0 left-0 flex flex-col justify-between z-10">
        
        <div>
            <div class="pt-4 px-4 md:pt-6 md:px-10 flex justify-between">
                <div class="md:space-y-1">
                    <h2 class="text-xl md:text-3xl font-semibold">{{ header }}</h2>
                    <div class="md:text-xl">KH West Tacloban</div>
                </div>
                <div>
                    <ReloadIcon class="h-6 w-6 cursor-pointer mt-1 mr-2 transition-transform" :class="{
                        'animate-spin text-blue-500': hasFetching,
                        'text-gray-600': !hasFetching
                    }" @click="$emit('reload')" />
                </div>
            </div>
        </div>

        <div class="w-full flex justify-between py-2 px-10 md:py-4 md:px-55">
            <div>
                <HardHatIcon class="h-6 w-6 md:h-9 md:w-9 cursor-pointer transition-colors"
                    :class="viewStore.view === 'home' ? 'text-blue-500' : 'text-gray-500'"
                    @click="viewStore.setView('home')" />
            </div>
            <div>

                <WrenchIcon class="h-6 w-6 md:h-9 md:w-9 cursor-pointer transition-colors"
                    :class="viewStore.view === 'followups' || viewStore.view === 'followup-details' ? 'text-blue-500' : 'text-gray-500'"
                    @click="viewStore.setView('followups')" />
            </div>
            <div>
                <WarningIcon class="h-6 w-6 md:h-9 md:w-9 cursor-pointer transition-colors"
                    :class="viewStore.view === 'preventive' || viewStore.view === 'preventive-monthly' ? 'text-blue-500' : 'text-gray-500'"
                    @click="viewStore.setView('preventive')" />
            </div>
            <div v-if="false">
                <CalendarIcon class="h-6 w-6 md:h-9 md:w-9 cursor-pointer transition-colors" 
                    :class="viewStore.view === 'calendar' ? 'text-blue-500' : 'text-gray-500'"
                    @click="viewStore.setView('calendar')" />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HardHatIcon from '@/icons/HardHatIcon.vue'
    import CalendarIcon from '@/icons/CalendarIcon.vue'
    import ReloadIcon from '@/icons/ReloadIcon.vue';
    import WarningIcon from '@/icons/WarningIcon.vue'
    import WrenchIcon from '@/icons/WrenchIcon.vue';
    import { useViewsStore } from '@/stores/views';
    import { computed } from 'vue';
    import { useInstructionsStore } from '@/stores/tasks-instructions';
    import { usePreventiveStore } from '@/stores/preventive';
    import { useFollowupsStore } from '@/stores/followups';

    const viewStore = useViewsStore()
    const ti = useInstructionsStore()
    const pm = usePreventiveStore()
    const fu = useFollowupsStore()

    const hasFetching = computed(() => ti.fetching || pm.fetching || fu.fetching)

    const header = computed(() => viewStore.headers[viewStore.view])
</script>