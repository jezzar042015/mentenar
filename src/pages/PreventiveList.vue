<template>
    <div class="px-4 py-5 mt-5">

        <div v-if="preventiveStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="grid grid-cols-1 gap-2 " v-else-if="!showTasks">
            <div v-for="m in months" class="bg-white p-4 shadow-sm rounded-sm border-l-4 border-blue-500" @click="initMonthTask(m)">
                <div>
                    {{ m }}
                </div>
            </div>
        </div>

        <PreventiveTasks :show="showTasks" :data="preventiveStore.data" v-if="preventiveStore.data && showTasks"
            @close="showTasks = false" />

    </div>
</template>

<script setup lang="ts">
    import { usePreventiveStore } from '@/stores/preventive';
    import { ref } from 'vue';
    import FetchingSpinner from '@/components/FetchingSpinner.vue';
    import PreventiveTasks from '@/components/PreventiveTasks.vue'

    const months: string[] = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    const preventiveStore = usePreventiveStore()

    const showTasks = ref(false)

    const initMonthTask = async (m: string) => {
        await preventiveStore.pullMonth(m)
        showTasks.value = true
    }
</script>