import type { FollowupItem } from "@/types/followups";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFollowupsStore = defineStore('followups', () => {
    const data = ref<FollowupItem[]>([])
    const fetching = ref(false)

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
            .sort((a, b) => new Date(a.target).getTime() - new Date(b.target).getTime());
    })

    const noDue = computed(() => {
        return data.value.filter(item => !item.target);
    })

    const pull = async () => {
        try {
            fetching.value = true
            const response = await fetch('https://script.google.com/macros/s/AKfycbwp6Q8pmodwrNiwL5ljOfNYj05q8EU91oz9WGfeB5Rk6q8ruy2Py-HfYAzZdSSIIM5P/exec')
            const result = await response.json()
            data.value = result.data
            fetching.value = false
        } catch (error) {
            console.log(error);
            // data.value = `Error: ${error}`
        }
    }

    return {
        data,
        fetching,
        pull,
        sorted,
        overdue,
        dueSoon,
        noDue,
    }
});