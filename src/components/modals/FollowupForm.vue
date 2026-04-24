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
                    <div class="text-xs text-gray-600">Assignee(s)</div>
                    <input type="text" v-model="formData.assignees"
                        class="py-2 px-2 border border-gray-600 w-full rounded-sm">
                </div>

                <div class="space-y-2">
                    <div class="text-xs text-gray-600">Remarks</div>
                    <textarea name="" v-model="formData.remarks"
                        class="w-full py-2 px-2 border border-gray-600 rounded-sm"></textarea>
                </div>

                <div class="space-y-2">
                    <div class="text-xs text-gray-600">
                        <span>Checklist</span>
                        <span> {{formData.list.filter(f =>
                            f.completed).length }} of {{ formData.list.length }}</span>

                    </div>
                    <div class="h-40 overflow-auto">
                        <div v-for="item in formData.list" :key="item.task" class="py-2"
                            @click="toggleChecklistStatus(item)">
                            <div class="flex gap-3 items-start transition-all duration-200 cursor-pointer">
                                <span
                                    :class="['flex border border-blue-800/70 rounded-sm h-4 w-4 mt-1', { 'bg-blue-800/70': item.completed }]"></span>
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
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white disabled:bg-gray-400"
                    :disabled="!hasChanges">
                    Update
                </button>
                <button @click="unsetTarget" class="py-2 shadow rounded-md cursor-pointer w-1/2">Discard</button>
            </div>

        </div>
    </div>
    <div v-if="posting" class="z-30 absolute top-0 left-0 w-full h-screen bg-white/90 flex items-center justify-center">
        <FetchingSpinner />
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth';
    import { useFollowupsStore } from '@/stores/followups';
    import type { FollowupChecklistItem, FollowupItem, FollowupItemUpdatePayload } from '@/types/followups';
    import { computed, ref, toRaw, watch } from 'vue';
    import FetchingSpinner from '../FetchingSpinner.vue';

    const { target } = defineProps<{
        target: FollowupItem | null
    }>()

    const formData = ref<FollowupItem | undefined>()
    const followups = useFollowupsStore()
    const auth = useAuthStore()
    const posting = ref(false)

    const emits = defineEmits([
        'unset-target',
        'update-target'
    ])

    const toggleChecklistStatus = (item: FollowupChecklistItem) => {
        item.completed = !item.completed
    }

    const unsetTarget = () => {
        emits('unset-target')
    }

    const changePayload = computed(() => {
        if (!target || !formData.value) return null

        // 1. Helper to extract the relevant subset for comparison
        const getComparisonState = (obj: FollowupItem): FollowupItemUpdatePayload => ({
            assignees: obj.assignees,
            target: obj.target,
            remarks: obj.remarks,
            // Map the list to only include the 'completed' value
            list: obj.list?.map(item => ({
                task: item.task,
                completed: item.completed
            })) || []
        })

        const originalState = getComparisonState(target)
        const currentState = getComparisonState(formData.value)

        // 2. Check if the stringified versions differ
        const hasChanges = JSON.stringify(originalState) !== JSON.stringify(currentState)

        if (hasChanges) {
            // 3. Return the specific object format you requested
            return {
                target: new Date(formData.value.target).toLocaleString('en-US', {
                    'month': 'short',
                    'day': 'numeric',
                    'year': 'numeric',
                }),
                assignees: formData.value.assignees,
                remarks: formData.value.remarks,
                list: formData.value.list // or map it if you only want 'completed' here too
            }
        }

        return null // No changes detected
    })

    const hasChanges = computed(() => Boolean(changePayload.value))

    const post = async () => {
        if (!formData.value || !changePayload.value) return

        const data = {
            task: formData.value.task,
            changes: changePayload.value
        }

        posting.value = true

        const resp = await followups.post({
            target: 'update-followup-item',
            token: auth.token,
            data
        })

        posting.value = false

        console.log(resp.status.toString());

        if (resp.status.toString() == '200') {
            emits('update-target', formData.value)
            unsetTarget()
        } else {
            return resp;
        }
    }

    watch(
        () => target,
        (b) => {
            if (b) {
                formData.value = structuredClone(toRaw(b))
            }
        }, {
        immediate: true
    })
</script>