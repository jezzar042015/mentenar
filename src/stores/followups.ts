import type { CalendarEvent } from "@/types/events";
import type { FollowupItem } from "@/types/followups";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFollowupsStore = defineStore('followups', () => {
    const data = useStorage<FollowupItem[]>('khoc-followup-items', [], localStorage, { mergeDefaults: true })
    const latestUpdate = useStorage<string>('khoc-followup-latest-update', '', localStorage)
    const fetching = ref(false)
    const activeTask = ref("")

    const sorted = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [...data.value].sort((a, b) => {

            const hasA = !!a.target;
            const hasB = !!b.target;

            // 1️⃣ No target dates go last
            if (!hasA && !hasB) return 0;
            if (!hasA) return 1;
            if (!hasB) return -1;

            const dateA = new Date(a.target);
            const dateB = new Date(b.target);

            dateA.setHours(0, 0, 0, 0);
            dateB.setHours(0, 0, 0, 0);

            const isLateA = dateA < today;
            const isLateB = dateB < today;

            // 2️⃣ Late items first
            if (isLateA && !isLateB) return -1;
            if (!isLateA && isLateB) return 1;

            // 3️⃣ Within same category, sort by date ascending
            return dateA.getTime() - dateB.getTime();
        });
    });

    const active = computed(() => {
        return data.value.find(item => item.task === activeTask.value);
    })

    const completed = computed(() => {
        return data.value
            .filter(item => item.status === 'Completed')
            .sort((a, b) => new Date(b.completed).getTime() - new Date(a.completed).getTime());;
    })

    const overdue = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [...data.value]
            .filter(item => {
                if (!item.target) return false;
                const date = new Date(item.target);
                date.setHours(0, 0, 0, 0);
                return date < today;
            })
            .filter(item => item.status !== 'Completed')
            .sort((a, b) => new Date(a.target).getTime() - new Date(b.target).getTime());
    })

    const dueSoon = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        return [...data.value]
            .filter(item => {
                if (!item.target) return false;
                const date = new Date(item.target);
                date.setHours(0, 0, 0, 0);
                return date >= today && date <= sevenDaysFromNow;
            })
            .filter(item => item.status !== 'Completed')
            .sort((a, b) => new Date(a.target).getTime() - new Date(b.target).getTime());
    })

    const dueNextWeeks = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

        return [...data.value]
            .filter(item => {
                if (!item.target) return false;
                const date = new Date(item.target);
                date.setHours(0, 0, 0, 0);
                return date > sevenDaysFromNow;
            })
            .filter(item => item.status !== 'Completed')
            .sort((a, b) => new Date(a.target).getTime() - new Date(b.target).getTime());
    })

    const noDue = computed(() => {
        return data.value.filter(item => !item.target && item.status !== 'Completed');
    })

    const pull = async () => {
        try {
            fetching.value = true
            const response = await fetch('https://script.google.com/macros/s/AKfycbz5xjY8PSmmuBnwgnBd8sf73HODcLqF-5tEmWBkUC4W_gDorNjXPVWWAfphZpXctDjH/exec')
            const result = await response.json()
            data.value = result.data
            latestUpdate.value = result.timestamp
            fetching.value = false
        } catch (error) {
            console.log(error);
            fetching.value = false
            // data.value = `Error: ${error}`
        }
    }

    const shouldPull = computed(() => {
        if (!latestUpdate.value) return true;
        const lastUpdateDate = new Date(latestUpdate.value);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60);
        return hoursDiff > 6;
    })

    const events = computed<CalendarEvent[]>(() => {
        return sorted.value.map(s => ({
            date: s.target,
            origin: 'followup',
            title: s.task,
            description: s.remarks,
            assignee: s.assignees
        }))
    })

    return {
        data,
        fetching,
        activeTask,
        pull,
        sorted,
        overdue,
        dueSoon,
        dueNextWeeks,
        noDue,
        shouldPull,
        active,
        completed,
        events
    }
});