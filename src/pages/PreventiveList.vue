<template>
    <div class="px-4 pt-4 mt-4 h-screen overflow-auto pb-34">

        <div v-if="preventiveStore.fetching">
            <FetchingSpinner />
        </div>

        <div class="grid grid-cols-1 gap-2 h-fit pb-10" v-else-if="!showTasks">
            <div class="space-y-2 md:grid md:grid-cols-2 md:gap-3 lg:grid-cols-2 ">
                <template v-for="m in preventiveStore.data">
                    <PreventiveMonthItem :m />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { usePreventiveStore } from '@/stores/preventive';
    import { ref } from 'vue';
    import FetchingSpinner from '@/components/FetchingSpinner.vue';
    import PreventiveMonthItem from '@/components/PreventiveMonthItem.vue';

    const preventiveStore = usePreventiveStore()
    const showTasks = ref(false)


</script>