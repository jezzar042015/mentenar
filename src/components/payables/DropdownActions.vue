<template>
    <div v-if="showActions"
        class="shadow-lg rounded bg-white absolute right-0 top-auto whitespace-nowrap space-y-1 p-1 md:text-sm">
        <div @click="emits('setAsReimbursed')" class="p-3 md:p-2 bg-white cursor-pointer rounded-sm hover:bg-amber-300">
            Set
            as Reimbursed</div>
        <hr class="border-0 border-b border-b-gray-100">
        <div class="p-3 md:p-2 bg-white cursor-pointer rounded-sm hover:bg-amber-300">
            Reimbursed & Create Transaction
        </div>
    </div>
</template>

<script setup lang="ts">
    const { showActions } = defineProps<{
        showActions: boolean
    }>()

    const emits = defineEmits<{
        (e: 'setAsReimbursed'): void
    }>()
</script>
