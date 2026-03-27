<template>
    <div class="mt-15 flex flex-col h-full items-center justify-center ">
        <div class="flex space-x-1 items-center justify-center">
            <span>Hello! </span>
            <h2 class="font-bold ">
                Kingdom Hall User
            </h2>
        </div>

        <div class="mt-10 flex justify-center ">
            <button @click="initSignin" class="shadow-lg rounded-md py-3 px-5 bg-blue-500 text-white">
                Sign in as KHOC Member
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
    import { useViewsStore } from '@/stores/views';


    const view = useViewsStore()

    const initSignin = () => {
        view.setView('signin')
    }
</script>