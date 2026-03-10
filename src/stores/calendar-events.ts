import { defineStore } from "pinia";
import { useFollowupsStore } from "./followups";
import { usePreventiveStore } from "./preventive";
import { computed } from "vue";
import type { CalendarEvent } from "@/types/events";

export const useCalendarEvents = defineStore('calendar-events', () => {
    const fu = useFollowupsStore()
    const pm = usePreventiveStore()

    const events = computed<CalendarEvent[]>(() => {
        return [...fu.events, ...pm.events]
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    })

    return {
        events
    }
}) 