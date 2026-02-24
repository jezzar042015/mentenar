<template>
    <div class="sticky w-full bg-white shadow top-0 left-0 flex flex-col justify-between z-10">
        <div class="">
            <div class="pt-4 px-4 flex justify-between">
                <div>
                    <h2 class="text-xl font-semibold">{{ header }}</h2>
                    <div>KH West Tacloban</div>
                </div>
                <div>
                    <ReloadIcon class="h-6 w-6 cursor-pointer text-gray-600 mt-1 mr-2" @click="$emit('reload')" />
                </div>
            </div>
        </div>
        <div class="w-full flex justify-between py-2 px-10">
            <HardHatIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'home' ? 'text-blue-500' : 'text-gray-500'"
                @click="viewStore.setView('home')" />
            <WrenchIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'followups' || viewStore.view === 'followup-details' ? 'text-blue-500' : 'text-gray-500'"
                @click="viewStore.setView('followups')" />
            <WarningIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'preventive' || viewStore.view === 'preventive-monthly' ? 'text-blue-500' : 'text-gray-500'"
                @click="viewStore.setView('preventive')" />
            <CalendarIcon class="h-6 w-6 cursor-pointer transition-colors" v-if="false" />
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

    const viewStore = useViewsStore()

    const header = computed(() => viewStore.headers[viewStore.view])

</script>