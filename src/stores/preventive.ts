import type { PreventiveResponse } from "@/types/preventive";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePreventiveStore = defineStore('preventive', () => {
    // const data = ref<PreventiveResponse[]>([])
    const data = useStorage<PreventiveResponse[]>('khoc-preventive-data', [], localStorage, { mergeDefaults: true })
    const latestUpdate = useStorage<string>('khoc-preventive-latest-update', '', localStorage)
    const fetching = ref(false)
    const activeMonth = ref('')

    const pullMonth = async () => {
        try {
            fetching.value = true
            const response = await fetch(`https://script.google.com/macros/s/AKfycbxVBoGAB_LAGXrexnNcVH2abKtax2aAxvWeQekUMq6c1OUzqyPEZ9JMVD6XerUb6FOt5w/exec`)
            const result = await response.json()
            data.value = result.data
            latestUpdate.value = result.timestamp
            fetching.value = false
        } catch (error) {
            fetching.value = false
            console.log(error);
            // data.value = `Error: ${error}`
        }
    }

    const activeMonthData = computed(() => {
        return data.value.find(d => d.month === activeMonth.value)
    })

    const currentMonth = computed(() => {
        const now = new Date();
        const monthString = now.toLocaleString('default', { month: 'long' });
        return data.value.find(d => d.month === monthString)
    })

    const currentMonthIsCompleted = computed(() => {
        if (!currentMonth.value) return false;
        return currentMonth.value.tasks.every(i => i.completed)
    })

    const lateMonths = computed(() => {
        return data.value.filter(d => {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentMonthIndex = new Date().getMonth();
            const dataMonthIndex = monthNames.indexOf(d.month);
            return dataMonthIndex < currentMonthIndex;
        })
    })

    const shouldPull = computed(() => {
        if (!latestUpdate.value) return true;
        const lastUpdateDate = new Date(latestUpdate.value);
        const now = new Date();
        if (lastUpdateDate.getMonth() !== now.getMonth() || lastUpdateDate.getFullYear() !== now.getFullYear()) return true;
        const daysDiff = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff > 5;
    })

    return {
        data,
        fetching,
        activeMonth,
        pullMonth,
        activeMonthData,
        shouldPull,
        currentMonth,
        lateMonths,
        currentMonthIsCompleted
    }
});