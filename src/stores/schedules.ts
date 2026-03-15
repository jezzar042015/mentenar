import type { WeeklyScheduleItem } from "@/types/weekly-schedules";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useScheduleStore = defineStore('schedules', () => {
    const data = useStorage<WeeklyScheduleItem[]>('khoc-schedules', [], localStorage, { mergeDefaults: true })
    const latestUpdate = useStorage<string>('khoc-schedules-latest-update', '', localStorage)
    const fetching = ref(false)

    const currentWeekNum = computed(() => {
        const date = new Date()

        const target = new Date(date.valueOf())
        const dayNr = (date.getDay() + 6) % 7

        target.setDate(target.getDate() - dayNr + 3)

        const firstThursday = new Date(target.getFullYear(), 0, 4)
        const diff = target.getTime() - firstThursday.getTime()

        return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))
    })

    const thisWeek = computed(() => {
        return data.value.find(w => w.weekNum === currentWeekNum.value)
    })

    const nextWeek = computed(() => {
        return data.value.find(w => w.weekNum === currentWeekNum.value + 1)
    })

    const pull = async () => {
        try {
            fetching.value = true
            const response = await fetch('https://script.google.com/macros/s/AKfycbyV-mJwrb3PBINA6_sL457dH9-ca5qLKHNVBqiTR6aadpfyg6nnKDZ2W3lcwGfcfMLU/exec')
            const result = await response.json()
            data.value = result.data
            latestUpdate.value = result.timestamp
            fetching.value = false
        } catch (error) {
            console.log(error);
            fetching.value = false
        }
    }

    const shouldPull = computed(() => {
        if (!latestUpdate.value) return true;
        const lastUpdateDate = new Date(latestUpdate.value);
        const now = new Date();
        if (lastUpdateDate.getMonth() !== now.getMonth() || lastUpdateDate.getFullYear() !== now.getFullYear()) return true;
        const daysDiff = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysDiff > 30;
    })

    return {
        thisWeek,
        nextWeek,
        fetching,
        pull,
        shouldPull,
    }
})