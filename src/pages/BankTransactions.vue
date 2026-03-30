<template>
    <div>
        {{ accounts.transactions }}
    </div>
</template>

<script setup lang="ts">
    import { useAccountsStore } from '@/stores/accounts';
    import { useViewsStore } from '@/stores/views';
    import { onMounted } from 'vue';

    const accounts = useAccountsStore()
    const view = useViewsStore()

    onMounted(() => {
        view.showHeader = false
    })
</script>
