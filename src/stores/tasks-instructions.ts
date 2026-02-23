import type { TaskInstruction } from "@/types/preventive";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useInstructionsStore = defineStore('instructions', () => {
    const fetching = ref(false)
    const data = ref<TaskInstruction[]>([])
    const activeId = ref('')

    const fetchAll = async () => {
        try {
            fetching.value = true
            const response = await fetch(`https://script.google.com/macros/s/AKfycbyx7V2Hg4dC9NBjPuh-DjKk3dwyfBkbuhiwblLyk1sh30iNKkAl8lz0V6BpGwbZ4SMqiw/exec`)
            const result = await response.json()
            data.value = result.data
            fetching.value = false
        } catch (error) {
            console.log(error);
        }
    }

    const active = computed(() => {
        return data.value.find(d => d.id === activeId.value)
    })

    return {
        data,
        activeId,
        fetching,
        fetchAll,
        active
    }
})