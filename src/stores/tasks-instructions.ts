import type { TaskInstruction } from "@/types/preventive";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useInstructionsStore = defineStore('instructions', () => {
    const fetching = ref(false)
    const data = useStorage<TaskInstruction[]>('khoc-tasks-instructions', [], localStorage, { mergeDefaults: true })
    const checks = useStorage<string[]>('khoc-tasks-instructions-checks', [], localStorage)
    const activeId = ref('')

    const fetchAll = async () => {
        try {
            fetching.value = true
            const response = await fetch('/mentenar/tasks-instructions.json')
            const result = await response.json()
            data.value = result
            fetching.value = false
        } catch (error) {
            fetching.value = false
            console.log(error);
        }
    }

    const active = computed(() => {
        return data.value.find(d => d.id === activeId.value)
    })

    const addCheck = (checkId: string) => {
        checks.value = [...checks.value, checkId]
    }

    const removeCheck = (checkId: string) => {
        checks.value = checks.value.filter(c => c !== checkId)
    }

    return {
        data,
        activeId,
        checks,
        fetchAll,
        addCheck,
        removeCheck,
        fetching,
        active
    }
})