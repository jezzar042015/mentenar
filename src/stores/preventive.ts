import type { PreventiveResponse } from "@/types/preventive";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePreventiveStore = defineStore('preventive', () => {
    const data = ref<PreventiveResponse | null>(null)
    const fetching = ref(false)

    const pullMonth = async (month: string) => {
        try {
            fetching.value = true
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwp6Q8pmodwrNiwL5ljOfNYj05q8EU91oz9WGfeB5Rk6q8ruy2Py-HfYAzZdSSIIM5P/exec?target=preventive&month=${month}`)
            const result = await response.json()
            data.value = result.data
            fetching.value = false
        } catch (error) {
            console.log(error);
            // data.value = `Error: ${error}`
        }
    }

    return {
        data,
        fetching,
        pullMonth
    }
});