<template>
    <div class="flex w-full h-screen items-center justify-center">
        <div class="flex flex-col items-center -mt-20">
            <div class="mb-10 font-bold text-xl">
                Request Further Access
            </div>

            <div class="space-y-10">
                <div>
                    <label class="block mb-2 text-sm font-medium" for="">Select Role</label>

                    <div class="relative w-65 border rounded px-3 py-2 cursor-pointer bg-white" @click="open = !open">
                        {{ role || 'Choose a role' }}
                    </div>

                    <ul v-if="open" class="absolute w-65 mt-1 rounded bg-white shadow">
                        <li v-for="r in roles" :key="r" @click="selectRole(r)"
                            class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            {{ r }}
                        </li>
                    </ul>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium" for="">Access Key</label>
                    <input type="text" v-model="key" name="" id=""
                        class="border w-65 rounded px-3 py-2 cursor-pointer bg-white">
                </div>
                <div class="space-x-4">
                    <button @click="signin" class="shadow-md py-2 px-6 rounded-md bg-blue-500 text-white">
                        Sign In
                    </button>
                    <button @click="cancel" class="shadow-md py-2 px-6 rounded-md">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth';
    import { useViewsStore } from '@/stores/views';
    import { ref } from 'vue';

    const roles = ref<string[]>([
        'Admin', 'Accounts', 'Member'
    ]);

    const role = ref('');
    const key = ref('');
    const open = ref(false);

    const view = useViewsStore()
    const auth = useAuthStore()

    function selectRole(r: string) {
        role.value = r;
        open.value = false;
    }

    const cancel = () => {
        view.setView('profile')
        view.showHeader = true
    }

    const signin = async () => {
        const resp = await auth.authenticate(role.value, key.value)
        if (resp) cancel()
    }
</script>