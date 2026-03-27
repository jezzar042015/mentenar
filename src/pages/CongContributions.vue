<template>
    <div>

    </div>
</template>

<script setup lang="ts">
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const views = useViewsStore()

    onMounted(() => {
        views.showHeader = false
    })
</script>