<template>
    <div>
        <div class="mb-5">
            <h2 class="text-2xl font-semibold">
                Preventative Maintenance
            </h2>
            <div>KH West Tacloban</div>
        </div>

        <div v-if="preventiveStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="grid grid-cols-2 gap-2" v-else>
            <div v-for="m in months" class="bg-white p-3 shadow" @click="initMonthTask(m)">
                {{ m }}
            </div>
        </div>

        <div class="bg-white w-full h-screen absolute top-0 left-0 p-4" v-if="showTasks">
            <div class="flex justify-between items-center">
                <div class="text-2xl font-semibold">{{ preventiveStore.data?.month }} 2026</div>
                <span class="pr-2" @click="showTasks=false">
                    <CloseIcon class="h-6 w-6 opacity-80" />
                </span>
            </div>

            <div class="text-lg">{{ preventiveStore.data?.assigned }} Congregation</div>

            <div class="mt-6 text-xl mb-2 font-semibold">Task Items</div>
            <div class="space-y-2">
                <div v-for="t in preventiveStore.data?.tasks" class="shadow p-3" @click="openTaskInstructions(t.url)">
                    {{ t.task }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import FetchingSpinner from '@/components/FetchingSpinner.vue';
    import { usePreventiveStore } from '@/stores/preventive';
    import { ref } from 'vue';
    import CloseIcon from '@/icons/CloseIcon.vue'

    const months: string[] = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    const preventiveStore = usePreventiveStore()

    const showTasks = ref(false)

    const initMonthTask = async (m: string) => {
        await preventiveStore.pullMonth(m)
        showTasks.value = true
    }

    const openTaskInstructions = (url: string) => {
        window.open(url, '_blank');
    } 
</script>