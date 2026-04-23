<template>
    <div v-if="target" class="absolute w-full h-screen bg-black/60 flex z-20 top-0 left-0 items-center justify-center">
        <div class="bg-white p-5 rounded-md w-full m-6 max-w-xl">

            <div class="flex gap-3 justify-between mt-15">
                <button @click="post"
                    class="py-2 shadow rounded-md cursor-pointer w-1/2 bg-blue-600 text-white">Update</button>
                <button @click="unsetTarget" class="py-2 shadow rounded-md cursor-pointer w-1/2">Discard</button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import type { FollowupItem } from '@/types/followups';

    const { target } = defineProps<{
        target: FollowupItem | null
    }>()

    const emits = defineEmits([
        'unset-target'
    ])

    const unsetTarget = () => {
        emits('unset-target')
    }

    const post = async () => { 
        
    }
</script>