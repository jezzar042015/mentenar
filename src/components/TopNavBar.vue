<template>
    <div class="sticky w-full bg-white shadow top-0 left-0 flex flex-col justify-between z-10">
        <div class="">
            <div class="pt-4 px-4">
                <h2 class="text-xl font-semibold">{{ header }}</h2>
                <div>KH West Tacloban</div>
            </div>
        </div>
        <div class="w-full flex justify-between py-2 px-15">
            <HomeIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'home' ? 'text-blue-500' : 'text-gray-500'" 
                @click="viewStore.setView('home')" />
            <WarningIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'followups' ? 'text-blue-500' : 'text-gray-500'"
                @click="viewStore.setView('followups')" />
            <CalendarIcon class="h-6 w-6 cursor-pointer transition-colors"
                :class="viewStore.view === 'preventive' || viewStore.view === 'preventive-monthly' ? 'text-blue-500' : 'text-gray-500'"
                @click="viewStore.setView('preventive')" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import HomeIcon from '@/icons/HomeIcon.vue'
    import CalendarIcon from '@/icons/CalendarIcon.vue'
    import WarningIcon from '@/icons/WarningIcon.vue'
    import { useViewsStore } from '@/stores/views';
    import { computed } from 'vue';

    const viewStore = useViewsStore()

    const header = computed(() => viewStore.headers[viewStore.view])

</script>