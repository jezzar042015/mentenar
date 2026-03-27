import type { AuthResponse } from "@/types/auth";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const token = useStorage<string>('khoc-auth-token', '', localStorage)
    const role = useStorage<string>('khoc-auth-role', '', localStorage)
    const fetching = ref(false)

    const authenticate = async (user_role: string, key: string) => {
        try {
            fetching.value = true
            const url = 'https://script.google.com/macros/s/AKfycbxuev1VOkUGWQa2enjeW-topHl-k93l1aDB4EIrNnTFljva_hu9QvFag0y1ANO72ZqVjw/exec';
            const response = await fetch(url, {
                method: 'POST',
                // Google Apps Script requires the 'follow' redirect mode, 
                // but 'cors' is the default and usually works fine.
                mode: 'cors',
                headers: {
                    'Content-Type': 'text/plain', // Using text/plain avoids CORS "preflight" issues with GAS
                },
                body: JSON.stringify({
                    role: user_role,
                    key: key
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as AuthResponse

            fetching.value = false

            if (result.status == 200) {
                token.value = result.token
                role.value = result.role
                return true
            } else if (result.status == 400) {
                return false
            }


        } catch (error) {
            console.log(error);
            fetching.value = false
            return false
        }
    }

    return {
        token,
        role,
        fetching,
        authenticate
    }
})