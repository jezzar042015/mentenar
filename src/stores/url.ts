import { defineStore } from "pinia"
import { ref } from "vue"

export const useURLStore = defineStore('url', () => {

    const allowedParams = ref<{
        v: string | null,
        ref: string | null,
        nh: string | null
    }>({
        v: null,
        ref: null,
        nh: null,
    })

    const parseURL = () => {
        const params = new URLSearchParams(globalThis.location.search)
        for (const key in allowedParams.value) {
            if (params.has(key)) {
                allowedParams.value[key as keyof typeof allowedParams.value] = params.get(key)
            }
        }
    }

    return {
        parseURL,
        allowedParams
    }



})