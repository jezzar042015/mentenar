<template>
    <div class="sticky w-full h-32 bg-white shadow top-0 left-0 flex flex-col justify-between z-10">
        <div>
            <div class="p-4">
                <h2 class="text-xl font-semibold">{{ header }}</h2>
                <div>KH West Tacloban</div>
            </div>
        </div>
        <div class="w-full flex justify-between pb-3 px-10">
            <HomeIcon class="h-6 w-6 cursor-pointer transition-colors" :class="currentView === 'home' ? 'text-blue-500' : 'text-gray-500'" @click="emits('set','home')"/>
            <WarningIcon class="h-6 w-6 cursor-pointer transition-colors" :class="currentView === 'followups' ? 'text-blue-500' : 'text-gray-500'" @click="emits('set','followups')"/>
            <CalendarIcon class="h-6 w-6 cursor-pointer transition-colors" :class="currentView === 'preventive' ? 'text-blue-500' : 'text-gray-500'" @click="emits('set','preventive')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { AppView } from '@/types/views'
    import HomeIcon from '@/icons/HomeIcon.vue'
    import CalendarIcon from '@/icons/CalendarIcon.vue'
    import WarningIcon from '@/icons/WarningIcon.vue'

    const { header, currentView } = defineProps<{
        header: string
        currentView: AppView
    }>()

    const emits = defineEmits(['set'])
</script>