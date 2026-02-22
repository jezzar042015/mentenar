import type { AppView } from "@/types/views";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useViewsStore = defineStore('views', () => {
    const view = ref<AppView>('home')

    const headers = ref<Record<AppView, string>>({
        "home": "Maintenance Overview",
        "followups": "Follow Up Items",
        "preventive": "Preventative Maintenance",
        "preventive-monthly": "Preventative Maintenance",
        "settings": "Settings",
    })

    const setView = (v: AppView) => {
        view.value = v
    }

    return {
        view,
        headers,
        setView
    }
});