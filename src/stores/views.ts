import type { AppView } from "@/types/views";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useURLStore } from "./url";
import { usePreventiveStore } from "./preventive";
import { useFollowupsStore } from "./followups";

export const useViewsStore = defineStore('views', () => {

    const url = useURLStore()
    const pm = usePreventiveStore()
    const fu = useFollowupsStore()

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
        "calendar": "Calendar Activies",
        "profile": "Operating Committee",
        "signin": "",
        "reimbursements": ""
    })

    const setView = (v: AppView) => {
        view.value = v
    }

    const handleViewRequest = async () => {
        showHeader.value = url.allowedParams.nh;
        view.value = url.allowedParams.v

        if (url.allowedParams.v === 'preventive-monthly' && url.allowedParams.ref) {
            pm.activeMonth = url.allowedParams.ref
            if (!pm.activeMonthData?.month) pm.activeMonth = ''
        }

        if (url.allowedParams.v === 'followup-details' && url.allowedParams.ref) {
            fu.activeTask = url.allowedParams.ref
            if (!fu.active?.task) 
                view.value = 'followups'
        }
    }

    return {
        view,
        showHeader,
        headers,
        setView,
        handleViewRequest
    }
});