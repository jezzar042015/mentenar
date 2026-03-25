<template>
    <div class="px-4 flex h-full items-center justify-center">

        <!-- If not authenticated -->
        <div v-if="!auth.token" class="mt-15">
            <div class="flex space-x-1 items-center justify-center">
                <span>Hello! </span>
                <h2 class="font-bold ">
                    Kingdom Hall User
                </h2>
            </div>
            <div class="mt-20 flex justify-center">
                <button @click="initSignin" class="shadow-lg rounded-md py-3 px-5 bg-blue-500 text-white">
                    Sign in as KHOC Member
                </button>
            </div>
        </div>

        <div v-else class="mt-15">
            <div class="flex space-x-1 items-center justify-center">
                <span>Hello! </span>
                <h2 class="font-bold ">
                    KHOC {{ auth.role }}
                </h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';

    const view = useViewsStore()
    const auth = useAuthStore()

    const initSignin = () => {
        view.setView('signin')
        view.showHeader = false
    }

</script>