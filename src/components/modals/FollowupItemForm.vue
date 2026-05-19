<template>
    <div @click.self="emits('close')" class="absolute top-0 left-0 z-10 h-screen w-full bg-black/60">
        <div class="bg-white p-5 rounded-md m-3 max-w-md">
            <div>
                New Follow Up Item
            </div>
            <div class="flex justify-between py-2">
                <div class="w-full flex justify-center" @click="activeSection = 'props'">
                    <span class="px-2 cursor-pointer"
                        :class="{ 'border-b-2 border-b-amber-400': activeSection == 'props' }">Details</span>
                </div>
                <div class="w-full flex justify-center" @click="activeSection = 'checklist'">
                    <span class="px-2 cursor-pointer"
                        :class="{ 'border-b-2 border-b-amber-400': activeSection == 'checklist' }">Checklist</span>
                </div>
            </div>
            <div class="min-h-100 overflow-hidden">
                <div v-if="activeSection == 'props'">
                    Details
                </div>
                <div v-if="activeSection == 'checklist'">
                    Checklist
                </div>
            </div>
            <div>
                <button class="shadow-md rounded-md bg-amber-400 py-2 px-3 text-sm cursor-pointer">Add Item</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupItem } from '@/types/followups';
    import { ref } from 'vue';

    const emits = defineEmits<{
        (e: 'close'): void
    }>()

    const draft = ref<FollowupItem>({
        task: "",
        assignees: "",
        completed: "",
        link: "",
        location: "",
        remarks: "",
        started: "",
        status: "In Progress",
        target: "",
        list: [],
    })

    const activeSection = ref<'props' | 'checklist'>('props')
</script>