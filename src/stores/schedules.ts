import type { WeeklyScheduleItem } from "@/types/weekly-schedules";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useScheduleStore = defineStore('schedules', () => {
    const data = useStorage<WeeklyScheduleItem[]>('khoc-schedules', [], localStorage, { mergeDefaults: true })
    const latestUpdate = useStorage<string>('khoc-schedules-latest-update', '', localStorage)
    const fetching = ref(false)

    const filteredData = computed(() => {
        const now = new Date()

        // Helper: convert ISO week/year → Date (Thursday of that week)
        const getDateFromWeek = (year: number, week: number) => {
            const simple = new Date(year, 0, 1 + (week - 1) * 7)
            const dayOfWeek = simple.getDay()
            const ISOweekStart = new Date(simple)

            if (dayOfWeek <= 4) {
                ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
            } else {
                ISOweekStart.setDate(simple.getDate() + (8 - simple.getDay()))
            }

            return ISOweekStart
        }

        // Get date 2 weeks ago
        const twoWeeksAgo = new Date(now)
        twoWeeksAgo.setDate(now.getDate() - 14)

        return data.value.filter(item => {
            const itemDate = getDateFromWeek(item.year, item.weekNum)

            return itemDate >= twoWeeksAgo
        })
    })

    const currentWeekNum = computed(() => {
        const date = new Date()

        const target = new Date(date.valueOf())
        const dayNr = (date.getDay() + 6) % 7

        target.setDate(target.getDate() - dayNr + 3)

        const firstThursday = new Date(target.getFullYear(), 0, 4)
        const diff = target.getTime() - firstThursday.getTime()

        return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))
    })

    const currentYear = computed(() => {
        const date = new Date()
        return date.getFullYear()
    })

    const thisWeek = computed(() => {
        return data.value.find(w => w.weekNum === currentWeekNum.value && w.year === currentYear.value)
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
        data,
        filteredData,
        thisWeek,
        nextWeek,
        fetching,
        pull,
        shouldPull,
        currentYear,
        currentWeekNum,
    }
})