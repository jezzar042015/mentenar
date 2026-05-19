<template>
    <div @click.self="emits('close')"
        class="absolute top-0 left-0 z-30 h-screen w-full bg-black/60 flex items-center justify-center">
        <div
            class="bg-white p-5 rounded-md h-full md:max-h-[90%] max-w-md min-w-sm md:min-w-lg flex flex-col justify-between">
            <div>
                <div class="border-b border-b-gray-400 uppercase mb-5 text-sm">
                    New Follow Up Item
                </div>
                <div class="flex justify-between py-2">
                    <div class="w-full flex justify-center" @click="activeSection = 'props'">
                        <span class="px-4 py-1 cursor-pointer"
                            :class="{ 'border-b-4 border-b-amber-400 text-amber-700 font-semibold': activeSection == 'props' }">Details</span>
                    </div>
                    <div class="w-full flex justify-center" @click="activeSection = 'checklist'">
                        <span class="px-4 py-1 cursor-pointer"
                            :class="{ 'border-b-4 border-b-amber-400 text-amber-700 font-semibold': activeSection == 'checklist' }">Checklist</span>
                    </div>
                </div>
            </div>
            <div class="min-h-100 overflow-hidden flex-1" >
                <div v-if="activeSection == 'props'" class="py-2 px-4">
                    <div class="mt-4 space-y-6">
                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Item Name</div>
                            <input type="text" v-model="draft.task"
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none">
                        </div>

                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Target</div>
                            <input type="date" v-model="draft.target"
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none">
                        </div>

                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Assignee</div>
                            <input type="text" v-model="draft.assignees"
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none">
                        </div>

                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Status</div>
                            <input type="text" v-model="draft.status" readonly
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none">
                        </div>

                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Location</div>
                            <textarea name="" v-model="draft.location"
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none" rows="1"></textarea>
                        </div>

                        <div class="space-y-1">
                            <div class="text-xs text-gray-600">Remarks</div>
                            <textarea name="" v-model="draft.remarks"
                                class="py-1 px-2 border-b border-b-gray-600 w-full outline-none"></textarea>
                        </div>
                    </div>
                </div>
                <div v-if="activeSection == 'checklist'" class="py-2 px-4">
                    
                </div>
            </div>
            <div class="space-x-2.5 pb-4">
                <button class="shadow-md rounded-md bg-amber-400 py-2 px-3 text-sm cursor-pointer">Add Item</button>
                <button @click="emits('close')" class="shadow-md rounded-md bg-gray-200 py-2 px-3 text-sm cursor-pointer">Cancel</button>
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