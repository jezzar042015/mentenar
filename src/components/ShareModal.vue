<template>
    <div class="absolute flex top-0 left-0 w-full h-full bg-black/30 z-20 p-4">
        <div class="bg-white rounded-md shadow-md p-5 w-full max-w-sm m-auto">
            <div class="flex justify-between gap-2">
                <div class="text-lg font-semibold mb-5">
                    Share Preventive Maintenance Details
                </div>
                <div>
                    <CloseIcon class="h-5 w-5 cursor-pointer text-gray-400" @click="$emit('close')" />
                </div>
            </div>
            <div class="mb-5">
                <div class="text-sm text-gray-500 mb-2">
                    Copy the link below to share the preventive maintenance details with others.
                </div>
                <input type="text" readonly
                    class="w-full border-gray-300 shadow-sm outline-none"
                    :value="link" />
                
                <button class="mt-3 w-full py-2 bg-blue-500 text-white rounded-md"
                    @click="copyLink">
                    Copy Link
                </button>  
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import CloseIcon from '@/icons/CloseIcon.vue';

    const emits = defineEmits(['close'])

    const {link} = defineProps<{
        link: string
    }>()

    const copyLink = () => {
        navigator.clipboard.writeText(link)
    }
</script>