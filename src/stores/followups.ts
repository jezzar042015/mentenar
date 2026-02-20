import type { FollowupItem } from "@/types/followups";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFollowupsStore = defineStore('followups', () => {
    const data = ref<FollowupItem[]>([])
    const fetching = ref(false)

    const pull = async () => {
        try {
            fetching.value = true
            const response = await fetch('https://script.google.com/macros/s/AKfycbwp6Q8pmodwrNiwL5ljOfNYj05q8EU91oz9WGfeB5Rk6q8ruy2Py-HfYAzZdSSIIM5P/exec')
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
        pull,
    }
});