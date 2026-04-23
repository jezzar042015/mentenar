<template>
    <div v-if="target" class="absolute w-full h-screen bg-black/60 flex z-20 top-0 left-0 items-center justify-center">
        <div class="bg-white p-5 rounded-md w-full m-3 max-w-xl max-h-[90%] overflow-hidden">
            <div class="space-y-5" v-if="formData">
                <div>
                    <div class="text-xs text-gray-600">Follow Up Item</div>
                    <div class="font-bold text-lg"> {{ target.task }}</div>
                </div>

                <div class="space-y-2">
                    <div class="text-xs text-gray-600">Target Date</div>
                    <input type="date" v-model="formData.target"
                        class="py-2 px-2 border border-gray-600 w-2/3 rounded-sm">
                </div>

                <div class="space-y-2">
                    <div class="text-xs text-gray-600">Remarks</div>
                    <textarea name="" v-model="formData.remarks"
                        class="w-full py-2 px-2 border border-gray-600 rounded-sm"></textarea>
                </div>

                <div class="space-y-2">
                    <div class="text-xs text-gray-600">Checklist</div>
                    <div class="h-60 overflow-auto">
                        <div v-for="item in formData.list" :key="item.task" class="py-2" @click="toggleChecklistStatus(item)">
                            <div class="flex gap-3 items-start transition-all duration-200">
                                <span
                                    :class="['flex border rounded-sm h-4 w-4 mt-1', { 'bg-black/70': item.completed }]"></span>
                                <span :class="[{ 'line-through': item.completed }]">
                                    {{ item.task }}
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex gap-3 justify-between mt-15">
                <button @click="post"
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white">Update</button>
                <button @click="unsetTarget" class="py-2 shadow rounded-md cursor-pointer w-1/2">Discard</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupChecklistItem, FollowupItem } from '@/types/followups';
    import { onMounted, ref } from 'vue';

    const { target } = defineProps<{
        target: FollowupItem | null
    }>()

    const formData = ref<FollowupItem | undefined>()

    const emits = defineEmits([
        'unset-target'
    ])

    const toggleChecklistStatus = (item: FollowupChecklistItem) => {
        item.completed = !item.completed
    }

    const unsetTarget = () => {
        emits('unset-target')
    }

    const post = async () => {

    }

    onMounted(() => {
        if (target) {
            formData.value = { ...target }
        }
    })
</script>