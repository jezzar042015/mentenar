import type { PreventiveResponse } from "@/types/preventive";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePreventiveStore = defineStore('preventive', () => {
    const data = ref<PreventiveResponse[]>([])
    const fetching = ref(false)
    const activeMonth = ref('')

    const pullMonth = async () => {
        try {
            fetching.value = true
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwp6Q8pmodwrNiwL5ljOfNYj05q8EU91oz9WGfeB5Rk6q8ruy2Py-HfYAzZdSSIIM5P/exec?target=preventive`)
            const result = await response.json()
            data.value = result.data
            fetching.value = false
        } catch (error) {
            console.log(error);
            // data.value = `Error: ${error}`
        }
    }

    const activeMonthData = computed(() => {
        return data.value.find(d => d.month === activeMonth.value)
    })

    return {
        data,
        fetching,
        activeMonth,
        pullMonth,
        activeMonthData
    }
});