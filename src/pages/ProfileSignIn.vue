<template>

    <div class="relative flex w-full h-screen items-center justify-center">
        <div v-if="signing"
            class="absolute flex top-0 left-0 w-full h-full bg-white/95 z-20 items-center justify-center">
            <FetchingSpinner />
        </div>
        <div class="flex flex-col items-center -mt-20">
            <div class="mb-10 font-bold text-xl">
                Request Further Access
            </div>

            <div class="space-y-10">
                <div ref="dropdownRef" class="relative">
                    <label class="block mb-2 text-sm font-medium" for="">Select Role</label>

                    <div :class="[
                        'relative w-65 border rounded px-3 py-2 cursor-pointer bg-white',
                        { 'text-gray-400 border-black': !role }
                    ]" @click="toggleDropdown">
                        {{ role || 'Choose a role' }}
                    </div>

                    <ul v-if="open" class="absolute w-65 mt-1 rounded bg-white shadow z-10">
                        <li v-for="r in roles" :key="r" @click="selectRole(r)"
                            class="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                            {{ r }}
                        </li>
                    </ul>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium" for="">Access Key</label>
                    <input type="text" v-model="key" class="border w-65 rounded px-3 py-2 bg-white" />
                </div>

                <div class="space-x-4">
                    <button @click="signin"
                        class="shadow-md py-2 px-6 rounded-md bg-blue-500 text-white disabled:bg-gray-300"
                        :disabled="!validInputs">
                        Sign In
                    </button>
                    <button @click="cancel" class="shadow-md py-2 px-6 rounded-md">
                        Cancel
                    </button>
                </div>
            </div>
            <div class="m-10 ">
                <div class="bg-red-100 px-5 py-2 rounded-lg" v-if="error">
                    <div class="text-center text-sm">
                        Oops! The role and access key don't match
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAuthStore } from '@/stores/auth'
    import { useViewsStore } from '@/stores/views'
    import { computed, onMounted, ref } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import FetchingSpinner from '@/components/FetchingSpinner.vue'
    import { useAccountsStore } from '@/stores/accounts'

    const roles = ref<string[]>([
        'Admin', 'Accounts', 'Member'
    ])

    const role = ref('')
    const key = ref('')
    const open = ref(false)
    const signing = ref(false)
    const error = ref(false)


    // reference for dropdown container
    const dropdownRef = ref<HTMLElement | null>(null)

    const view = useViewsStore()
    const auth = useAuthStore()
    const account = useAccountsStore()

    function toggleDropdown() {
        open.value = !open.value
    }

    function selectRole(r: string) {
        role.value = r
        open.value = false
    }

    // close dropdown when clicking outside
    onClickOutside(dropdownRef, () => {
        open.value = false
    })

    const cancel = () => {
        view.setView('profile')
        view.showHeader = true
    }

    const signin = async () => {
        signing.value = true
        const resp = await auth.authenticate(role.value, key.value)

        if (resp) {
            await account.pull()
            signing.value = false
            cancel()
        } else {
            signing.value = false
            error.value = true
        }


    }

    const validInputs = computed(() => {
        return role.value && key.value
    })

    onMounted(() => {
        view.showHeader = false
    })
</script>