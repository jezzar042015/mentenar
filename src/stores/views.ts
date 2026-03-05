import type { AppView } from "@/types/views";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useViewsStore = defineStore('views', () => {
    // default view
    const view = ref<AppView>('home')

    // default header visibility
    const showHeader = ref(true)

    const headers = ref<Record<AppView, string>>({
        "home": "Maintenance Overview",
        "followups": "Follow Up Items",
        "followup-details": "Follow Up Items",
        "preventive": "Preventative Maintenance",
        "preventive-monthly": "Preventative Maintenance",
        "settings": "Settings",
        "instruction": "Task Instruction",
        "calendar": "Calendar Activies"
    })

    const setView = (v: AppView) => {
        view.value = v
    }

    return {
        view,
        showHeader,
        headers,
        setView
    }
});